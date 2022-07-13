'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.room, {
        through: "booking_record",
        foreignKey: "user_id",
        as: "user_room"
      })

      user.hasMany(models.booking_record, {
        foreignKey: "user_id",
        as: "user_booking"
      })
    }
  }
  user.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5,15],
          msg: "username should be filled with minimum 5 character maximum 15"
        },
        notNull: {
          args: true,
          msg: "Cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5,15],
          msg: "password should be filled with minimum 5 character maximum 15"
        },
        notNull: {
          args: true,
          msg: "Cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        isIn: {
          args: [['user', 'admin']],
          msg: "Must be filled with either user or admin"
        },
        notNull: {
          args: true,
          msg: "Cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users'
  });
  return user;
};
