'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'reviewimageurl1'
      },
      {
        reviewId: 1,
        url: 'reviewimageurl2'
      },
      {
        reviewId: 2,
        url: 'reviewimageurl3'
      },
      {
        reviewId: 3,
        url: 'reviewimageurl4'
      },
      {
        reviewId: 3,
        url: 'reviewimageurl5'
      },
      {
        reviewId: 3,
        url: 'reviewimageurl6'
      }
    ], {validate: true});
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1, 2, 3, 4, 5, 6]}
    }, {});
  }
};
