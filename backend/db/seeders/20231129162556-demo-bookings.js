'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,    // Aunt May's House
        userId: 2,    // Iron Man
        startDate: '2023-11-23',
        endDate: '2023-11-24'
      },
      {
        spotId: 2,    // Stark Tower
        userId: 3,    // Captain America
        startDate: '2022-12-17',
        endDate: '2022-12-18'
      },
      {
        spotId: 3,    // Cap's Apartment
        userId: 1,    // Spider-Man
        startDate: '2023-08-14',
        endDate: '2023-08-17'
      },
      {
        spotId: 2,    // Stark Tower
        userId: 1,    // Spider-Man
        startDate: '2023-09-06',
        endDate: '2023-09-10'
      }
    ], {validate: true});
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      id: {[Op.in]: [1, 2, 3, 4]}
    }, {});
  }
};
