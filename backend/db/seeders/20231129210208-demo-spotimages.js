'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'spotimageurl1',
        preview: false
      },
      {
        spotId: 1,
        url: 'spotimageurl2',
        preview: true
      },
      {
        spotId: 2,
        url: 'spotimageurl3',
        preview: true
      },
      {
        spotId: 2,
        url: 'spotimageurl4',
        preview: false
      },
      {
        spotId: 3,
        url: 'spotimageurl5',
        preview: false
      },
      {
        spotId: 3,
        url: 'spotimageurl6',
        preview: false
      }
    ], {validate: true});
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1, 2, 3, 4, 5, 6]}
    }, {});
  }
};
