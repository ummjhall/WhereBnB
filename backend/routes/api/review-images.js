const express = require('express');
const { ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
  const image = await ReviewImage.findByPk(req.params.imageId);
  if (!image) return res.status(404).json({"message": "Review Image couldn't be found"});

  const reviewOwnerId = await image.getReview().then(res => res.userId);
  if (req.user.id != reviewOwnerId) {
    return res.status(403).json({"message": "Forbidden"});
  }

  await image.destroy();

  res.json({"message": "Successfully deleted"});
});

module.exports = router;
