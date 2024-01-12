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
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078511/cld-sample-2.jpg',
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
