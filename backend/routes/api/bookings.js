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

module.exports = router;
