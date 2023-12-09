const express = require('express');
const { Booking, Spot, SpotImage } = require('../../db/models');
const { requireAuth, authorize } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
  const ownedBookings = [];
  await Booking.findAll({
    where: {userId: req.user.id},
    attributes: {include: ['id']},
    include: [
      {model: Spot, attributes: {exclude: ['description', 'createdAt', 'updatedAt']},
        include: [{model: SpotImage}]
      }
    ]
  }).then(bookings => {
    bookings.forEach(booking => {
      ownedBookings.push(booking.toJSON());
    });
  });

  // Format response
  ownedBookings.forEach(booking => {
    booking.Spot.lat = Number(booking.Spot.lat);
    booking.Spot.lng = Number(booking.Spot.lng);
    booking.Spot.price = Number(booking.Spot.price);
    booking.Spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview === true) {
       booking.Spot.previewImage = spotImage.url;
      }
    });
    if (!booking.Spot.previewImage) {
      booking.Spot.previewImage = 'No preview image';
    }
    delete booking.Spot.SpotImages;
  });

  res.json({Bookings: ownedBookings});
});

const validateBookingEdit = [
  check('startDate').isAfter(new Date().toString()).withMessage('startDate cannot be in the past'),
  check('endDate').custom(async (value, { req }) => {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(value);
    if (endDate <= startDate) {
      throw new Error('endDate cannot be on or before startDate');
    }
  }),
  check('startDate').custom(async (value, { req }) => {
    if (!req.booking) return;
    const spotId = await Booking.findByPk(req.params.bookingId).then(res => res.spotId);
    let bookings = await Booking.findAll({where: {spotId}});
    bookings = JSON.parse(JSON.stringify(bookings));
    bookings.forEach(booking => {
      if (booking.id != req.params.bookingId) {
        booking.startDate = booking.startDate.slice(0, 10);
        booking.endDate = booking.endDate.slice(0, 10);
        if ((booking.startDate <= value && booking.endDate >= value) ||
          (value < booking.startDate && req.body.endDate > booking.endDate)) {
          throw new Error('Start date conflicts with an existing booking');
        }
      }
    });
  }),
  check('endDate').custom(async (value, { req }) => {
    if (!req.booking) return;
    const spotId = await Booking.findByPk(req.params.bookingId).then(res => res.spotId);
    let bookings = await Booking.findAll({where: {spotId}});
    bookings = JSON.parse(JSON.stringify(bookings));
    bookings.forEach(booking => {
      if (booking.id != req.params.bookingId) {
        booking.startDate = booking.startDate.slice(0, 10);
        booking.endDate = booking.endDate.slice(0, 10);
        if ((booking.startDate <= value && booking.endDate >= value) ||
          (req.body.startDate < booking.startDate && value > booking.endDate)) {
          throw new Error('End date conflicts with an existing booking');
        }
      }
    });
  }),
  handleValidationErrors
];

// Edit a Booking
router.put('/:bookingId', requireAuth, authorize, validateBookingEdit, async (req, res) => {
  const { booking } = req;
  if (!booking) return res.status(404).json({message: "Booking couldn't be found"});

  if (new Date(booking.endDate) < new Date()) {
    return res.status(403).json({"message": "Past bookings can't be modified"});
  }

  booking.update(req.body);

  res.json(booking);
});

// Delete a Booking
router.delete('/:bookingId', requireAuth, authorize, async (req, res) => {
  const { booking } = req;
  if (!booking) return res.status(404).json({message: "Booking couldn't be found"});

  if (new Date(booking.startDate) < new Date()) {
    return res.status(403).json({"message": "Bookings that have been started can't be deleted"});
  }

  await booking.destroy();

  res.json({"message": "Successfully deleted"});
});

module.exports = router;
