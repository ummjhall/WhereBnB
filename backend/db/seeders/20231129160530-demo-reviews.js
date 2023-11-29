'use strict';

const { Review } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,    // Aunt May's House
        userId: 2,    // Iron Man
        review: 'Worth it',
        stars: 5
      },
      {
        spotId: 2,    // Stark Tower
        userId: 3,    // Captain America
        review: 'A little over the top',
        stars: 3
      },
      {
        spotId: 3,    // Cap's Apartment
        userId: 1,    // Spider-Man
        review: 'Nice place, I like it',
        stars: 5
      },
      {
        spotId: 2,    // Stark Tower
        userId: 1,    // Spider-Man
        review: "This place is freakin' amazing!",
        stars: 5
      }
    ], {validate: true});
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1, 2, 3, 4]}
    }, {});
  }
};
