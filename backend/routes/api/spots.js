const express = require('express');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Get all Spots
router.get('/', async (req, res, next) => {
  let spots = await Spot.findAll({include: [{model: SpotImage}, {model: Review}]});
  spots = formatSpots(spots);
  res.json(spots);
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  let ownedSpots = await Spot.findAll({
    where: {ownerId: req.user.id},
    include: [{model: SpotImage}, {model: Review}]
  });
  ownedSpots = formatSpots(ownedSpots);
  res.json(ownedSpots);
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
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

// Utility function
function formatSpots(spots) {
  spots = {Spots: JSON.parse(JSON.stringify(spots))};

  spots.Spots.forEach(spot => {
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
