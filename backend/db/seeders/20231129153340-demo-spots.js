'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Spidey Street',
        city: 'New York City',
        state: 'NY',
        country: 'USA',
        lat: 40.72,
        lng: 73.84,
        name: "Aunt May's House",
        description: "A house in your friendly neighborhood",
        price: 399.99
      },
      {
        ownerId: 2,
        address: '123 Stark Street',
        city: 'Malibu',
        state: 'CA',
        country: 'USA',
        lat: 34.00,
        lng: 118.81,
        name: 'Stark Tower',
        description: "Hopefully won't get missiled",
        price: 3999.99
      },
      {
        ownerId: 3,
        address: '123 USA Street',
        city: 'Washington DC',
        state: 'DC',
        country: 'USA',
        lat: 38.91,
        lng: 77.04,
        name: "Cap's Apartment",
        description: 'Just a regular place',
        price: 39.99
      }
    ], {validate: true});
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: {[Op.in]: ["Aunt May's House", 'Stark Tower', "Cap's Apartment"]}
    }, {});
  }
};
