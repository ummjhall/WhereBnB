const express = require('express');
const { SpotImage } = require('../../db/models');
const { requireAuth, authorize } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.imageId);
  if (!image) return res.status(404).json({"message": "Spot Image couldn't be found"});

  const spotOwnerId = await image.getSpot().then(res => res.ownerId);
  if (req.user.id != spotOwnerId) {
    return res.status(403).json({"message": "Forbidden"});
  }

  await image.destroy();

  res.json({"message": "Successfully deleted"});
});

module.exports = router;
