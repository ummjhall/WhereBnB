const express = require('express');
const { Spot, SpotImage, Review } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  let spots = await Spot.findAll({include: [{model: SpotImage}, {model: Review}]});
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

  res.json(spots);
});

module.exports = router;
