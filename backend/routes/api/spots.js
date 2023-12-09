const express = require('express');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth, authorize } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const router = express.Router();

const validateGetAllSpots = [
  check('page').optional().notEmpty().isInt({min: 1})
    .withMessage('Page must be greater than or equal to 1'),
  check('size').optional().notEmpty().isInt({min: 1})
    .withMessage('Size must be greater than or equal to 1'),
  check('minLat').optional().isFloat({min: -90, max: 90})
    .withMessage('Minimum latitude is invalid'),
  check('maxLat').optional().isFloat({min: -90, max: 90})
    .withMessage('Maximum latitude is invalid'),
  check('minLng').optional().isFloat({min: -180, max: 180})
    .withMessage('Minimum longitude is invalid'),
  check('maxLng').optional().isFloat({min: -180, max: 180})
    .withMessage('Maximum longitude is invalid'),
  check('minPrice').optional().isFloat({min: 0})
    .withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice').optional().isFloat({min: 0})
    .withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors
];

// Get all Spots
router.get('/', validateGetAllSpots, async (req, res) => {
  const isFiltered = Object.keys(req.query).length > 0;

  let { page, size } = req.query;
  page = parseInt(page);
  size = parseInt(size);
  if (Number.isNaN(page) || page < 0) page = 1;
  if (page > 10) page = 10;
  if (Number.isNaN(size) || size < 0) size = 20;
  if (size > 20) size = 20;
  const limit = size;
  const offset = size * (page - 1);

  let spots;
  if (isFiltered) {
    spots = await Spot.findAll({include: [{model: SpotImage}, {model: Review}], limit, offset});
  } else {
    spots = await Spot.findAll({include: [{model: SpotImage}, {model: Review}]});
  }

  spots = JSON.parse(JSON.stringify(spots));

  if (req.query.minLat) spots = spots.filter(spot => spot.lat >= req.query.minLat);
  if (req.query.maxLat) spots = spots.filter(spot => spot.lat <= req.query.maxLat);
  if (req.query.minLng) spots = spots.filter(spot => spot.lng >= req.query.minLng);
  if (req.query.maxLng) spots = spots.filter(spot => spot.lng <= req.query.maxLng);
  if (req.query.minPrice) spots = spots.filter(spot => spot.price >= req.query.minPrice);
  if (req.query.maxPrice) spots = spots.filter(spot => spot.price <= req.query.maxPrice);

  spots = formatSpots(spots);

  if (isFiltered) return res.json({Spots: spots, page, size});
  res.json({Spots: spots});
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  let ownedSpots = await Spot.findAll({
    where: {ownerId: req.user.id},
    include: [{model: SpotImage}, {model: Review}]
  });
  ownedSpots = JSON.parse(JSON.stringify(ownedSpots));
  ownedSpots = formatSpots(ownedSpots);
  res.json({Spots: ownedSpots});
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  let spot = await Spot.findOne({
    where: {id: req.params.spotId},
    include: [
      {model: Review},
      {model: SpotImage, attributes: ['id', 'url', 'preview']},
      {model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']}
    ]
  });

  if (!spot) {
    return res.status(404).json({message: "Spot couldn't be found"});
  }

  spot = spot.toJSON();
  spot.lat = Number(spot.lat);
  spot.lng = Number(spot.lng);
  spot.price = Number(spot.price);
  spot.numReviews = spot.Reviews.length;
  const totalStars = spot.Reviews.reduce((sum, review) => sum + review.stars, 0);
  spot.avgStarRating = totalStars / spot.numReviews;
  delete spot.Reviews;

  res.json(spot);
});

const validateSpot = [
  check('address').notEmpty().withMessage('Street address is required'),
  check('city').notEmpty().withMessage('City is required'),
  check('state').notEmpty().withMessage('State is required'),
  check('country').notEmpty().withMessage('Country is required'),
  check('lat').notEmpty().isFloat({min: -90, max: 90}).withMessage('Latitude must be within -90 and 90'),
  check('lng').notEmpty().isFloat({min: -180, max: 180}).withMessage('Longitude must be within -180 and 180'),
  check('name').notEmpty().isLength({max: 50}).withMessage('Name must be less than 50 characters'),
  check('description').notEmpty().withMessage('Description is required'),
  check('price').notEmpty().isFloat({min: 0}).withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  let newSpot = await Spot.create({ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price});
  newSpot = newSpot.toJSON();
  newSpot.lat = Number(newSpot.lat);
  newSpot.lng = Number(newSpot.lng);
  newSpot.price = Number(newSpot.price);
  res.status(201).json(newSpot);
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, authorize, async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({message: "Spot couldn't be found"});
  }

  const { url, preview } = req.body;
  const newSpotImage = await SpotImage.create({spotId, url, preview});

  res.json({
    id: newSpotImage.id,
    url: newSpotImage.url,
    preview: newSpotImage.preview
  });
});

const validateSpotEdit = [
  check('address').optional().notEmpty().withMessage('Street address is required'),
  check('city').optional().notEmpty().withMessage('City is required'),
  check('state').optional().notEmpty().withMessage('State is required'),
  check('country').optional().notEmpty().withMessage('Country is required'),
  check('lat').optional().notEmpty().isFloat({min: -90, max: 90}).withMessage('Latitude must be within -90 and 90'),
  check('lng').optional().notEmpty().isFloat({min: -180, max: 180}).withMessage('Longitude must be within -180 and 180'),
  check('name').optional().notEmpty().isLength({max: 50}).withMessage('Name must be less than 50 characters'),
  check('description').optional().notEmpty().withMessage('Description is required'),
  check('price').optional().notEmpty().isFloat({min: 0}).withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

// Edit a Spot
router.put('/:spotId', requireAuth, validateSpotEdit, authorize, async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);
  if (!spot) return res.status(404).json({message: "Spot couldn't be found"});

  await spot.update(req.body);
  spot = spot.toJSON();
  spot.lat = Number(spot.lat);
  spot.lng = Number(spot.lng);
  spot.price = Number(spot.price);

  res.json(spot);
});

// Delete a Spot
router.delete('/:spotId', requireAuth, authorize, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.status(404).json({message: "Spot couldn't be found"});
  }

  await spot.destroy();

  res.json({message: 'Successfully deleted'});
});

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.status(404).json({message: "Spot couldn't be found"});
  }

  const reviews = await spot.getReviews({
    include: [{model: User}, {model: ReviewImage, attributes: ['id', 'url']}]
  });


  res.json({Reviews: reviews});
});

const validateReview = [
  check('review').notEmpty().withMessage('Review text is required'),
  check('stars').notEmpty().isInt({min: 1, max: 5}).withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) return res.status(404).json({message: "Spot couldn't be found"});

  await spot.getReviews().then(reviews => {
    reviews.forEach(review => {
      if (review.userId === req.user.id) {
        res.status(500).json({message: 'User already has a review for this spot'});
      }
    });
  });

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: Number(req.params.spotId),
    review: req.body.review,
    stars: req.body.stars
  });

  res.status(201).json(newReview);
});

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) return res.status(404).json({message: "Spot couldn't be found"});

  const isOwner = req.user.id === spot.ownerId;
  let bookings = [];

  if (isOwner) {
    bookings = await Booking.findAll({
      attributes: {include: ['id']},
      include: [
        {model: User},
        {model: Spot, where: {ownerId: req.user.id, id: req.params.spotId}, attributes: []}
      ]
    });
  } else {
    bookings = await Booking.findAll({
      where: {userId: req.user.id, spotId: req.params.spotId},
      attributes: ['spotId', 'startDate', 'endDate']
    });
  }

  res.json({Bookings: bookings});
});

const validateBooking = [
  check('startDate').isAfter(new Date().toString()).withMessage('startDate cannot be in the past'),
  check('startDate').custom(async (value, { req }) => {
    await Booking.findAll({where: {spotId: req.params.spotId}})
      .then(res => {
        res = JSON.parse(JSON.stringify(res));
        res.forEach(booking => {
          booking.startDate = booking.startDate.slice(0, 10);
          booking.endDate = booking.endDate.slice(0, 10);
          if ((booking.startDate <= value && booking.endDate >= value) ||
            (value < booking.startDate && req.body.endDate > booking.endDate)) {
            throw new Error('Start date conflicts with an existing booking');
          }
        });
      });
  }),
  check('endDate').custom(async (value, { req }) => {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(value);
    if (endDate <= startDate) {
      throw new Error('endDate cannot be on or before startDate');
    }
  }),
  check('endDate').custom(async (value, { req }) => {
    await Booking.findAll({where: {spotId: req.params.spotId}})
      .then(res => {
        res = JSON.parse(JSON.stringify(res));
        res.forEach(booking => {
          booking.startDate = booking.startDate.slice(0, 10);
          booking.endDate = booking.endDate.slice(0, 10);
          if ((booking.startDate <= value && booking.endDate >= value) ||
            (req.body.startDate < booking.startDate && value > booking.endDate)) {
            throw new Error('End date conflicts with an existing booking');
          }
        });
      });
  }),
  handleValidationErrors
];

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, validateBooking, authorize, async (req, res) => {
  const { spot } = req;
  if (!spot) return res.status(404).json({message: "Spot couldn't be found"});

  const newBooking = await Booking.create({
    spotId: req.params.spotId,
    userId: req.user.id,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  res.json(newBooking);
});

// Utility function
function formatSpots(spots) {
  spots.forEach(spot => {
    spot.lat = Number(spot.lat);
    spot.lng = Number(spot.lng);
    spot.price = Number(spot.price);

    const totalStars = spot.Reviews.reduce((sum, review) => {
      return sum + review.stars;
    }, 0);
    spot.avgRating = totalStars / spot.Reviews.length;
    delete spot.Reviews;

    spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview === true) spot.previewImage = spotImage.url;
    });
    if (!spot.previewImage) spot.previewImage = 'No preview image';
    delete spot.SpotImages;
  });

  return spots;
}

module.exports = router;
