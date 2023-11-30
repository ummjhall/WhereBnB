const express = require('express');
const { Spot, SpotImage, Review } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  let spots = await Spot.findAll({include: [{model: SpotImage}, {model: Review}]});
  spots = JSON.parse(JSON.stringify(spots));

  spots.forEach(spot => {
    const totalStars = spot.Reviews.reduce((sum, review) => {
      return sum + review.stars;
    }, 0);
    spot.avgRating = totalStars / spot.Reviews.length;
    delete spot.Reviews;

    spot.SpotImages.forEach(spotImage => {
      if (spotImage.preview === true) spot.previewImage = spotImage.url;
    });
    if (!spot.previewImage) spot.previewImage = null;
    delete spot.SpotImages;
  });

  spots = {Spots: spots};
  res.json(spots);
});







// router.get('/', async (req, res, next) => {
//   let spots = await Spot.findAll();
//   // spots = JSON.parse(JSON.stringify(spots));

//   spots.forEach(spot => {
//     (async () => {
//       let previewImage = await spot.getSpotImages({where: {preview: true}});
//       previewImage = JSON.parse(JSON.stringify(previewImage));

//       spot = JSON.parse(JSON.stringify(spot));

//       if (previewImage[0]) {
//         spot.previewImage = previewImage[0].url;
//       } else {
//         spot.previewImage = null;
//       }

//       // console.log(spot);
//     })();
//   });


//   // console.log(spots);
//   res.json(spots);
// });

module.exports = router;
