'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Peter',
        lastName: 'Parker',
        username: 'Spider-Man',
        hashedPassword: bcrypt.hashSync('spideysense'),
        email: 'spiderman@gmail.com'
      },
      {
        firstName: 'Tony',
        lastName: 'Stark',
        username: 'IronMan',
        hashedPassword: bcrypt.hashSync('realmanofsteel'),
        email: 'ironman@gmail.com'
      },
      {
        firstName: 'Steve',
        lastName: 'Rogers',
        username: 'CaptainAmerica',
        hashedPassword: bcrypt.hashSync('icoulddothisallday'),
        email: 'captainamerica@gmail.com'
      }
    ], { validate: true });
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Spider-Man', 'IronMan', 'CaptainAmerica'] }
    }, {});
  }
};
