'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Spot, {
        as: 'Owner',
        foreignKey: 'ownerId',
        onDelete: 'CASCADE'
      });
      User.belongsToMany(models.Spot, {
        through: models.Booking,
        foreignKey: 'userId',
        otherKey: 'spotId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [4,30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validate: {
        len: [60,60]
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [3,256],
        isEmail: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
