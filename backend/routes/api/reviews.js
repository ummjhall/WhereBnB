const express = require('express');
const { Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth, authorize } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
  const ownedReviews = [];
  let reviews = await Review.findAll({
    where: {userId: req.user.id},
    include: [
      {model: User},
      {model: Spot, attributes: {exclude: ['description', 'createdAt', 'updatedAt']},
        include: [{model: SpotImage}]
      },
      {model: ReviewImage, attributes: ['id', 'url']}
    ]
  }).then(reviews => {
    reviews.forEach(review => {
      ownedReviews.push(review.toJSON());
    });
  });

  ownedReviews.forEach(review => {
    review.Spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview === true) {
       review.Spot.previewImage = spotImage.url;
      }
    });

    if (!review.Spot.previewImage) {
      review.Spot.previewImage = 'No preview image';
    }

    delete review.Spot.SpotImages;
  });

  res.json({Reviews: ownedReviews});
});


module.exports = router;
