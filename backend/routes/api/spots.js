const express = require('express');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { requireAuth, authorize } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Get all Spots
router.get('/', async (_req, res) => {
  let spots = await Spot.findAll({include: [{model: SpotImage}, {model: Review}]});
  spots = formatSpots(spots);
  res.json(spots);
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  let ownedSpots = await Spot.findAll({
    where: {ownerId: req.user.id},
    include: [{model: SpotImage}, {model: Review}]
  });
  ownedSpots = formatSpots(ownedSpots);
  res.json(ownedSpots);
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
  const newSpot = await Spot.create({ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price});
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

// Edit a Spot
router.put('/:spotId', requireAuth, authorize, validateSpot, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.status(404).json({message: "Spot couldn't be found"});
  }

  spot.update(req.body);

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

// Utility function
function formatSpots(spots) {
  spots = {Spots: JSON.parse(JSON.stringify(spots))};

  spots.Spots.forEach(spot => {
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
