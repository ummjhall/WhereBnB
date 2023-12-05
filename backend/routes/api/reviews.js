const express = require('express');
const { Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth, authorize } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
  const ownedReviews = [];
  await Review.findAll({
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

  // Format response
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

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, authorize, async (req, res) => {
  const { review } = req;
  if (!review) return res.status(404).json({message: "Review couldn't be found"});

  const reviewImages = await review.getReviewImages();
  if (reviewImages.length >= 10) {
    return res.status(403).json({"message": "Maximum number of images for this resource was reached"});
  }

  const newReviewImage = await req.review.createReviewImage({url: req.body.url})
    .then(image => image.toJSON());
  res.json({id: newReviewImage.id, url: newReviewImage.url});
});

const validateReview = [
  check('review').notEmpty().withMessage('Review text is required'),
  check('stars').notEmpty().isInt({min: 1, max: 5}).withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
]

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, authorize, async (req, res) => {
  const { review } = req;
  if (!review) return res.status(404).json({message: "Review couldn't be found"});
  await review.update({review: req.body.review, stars: req.body.stars});
  res.json(review);
});

// Delete a Review
router.delete('/:reviewId', requireAuth, authorize, async (req, res) => {
  const { review } = req;
  if (!review) return res.status(404).json({message: "Review couldn't be found"});
  await review.destroy();
  res.json({"message": "Successfully deleted"});
});

module.exports = router;
