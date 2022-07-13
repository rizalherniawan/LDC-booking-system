'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      room.belongsToMany(models.user, {
        through: "booking_record",
        foreignKey: "room_id",
        as: "room_user"
      })
      
      room.hasMany(models.booking_record, {
        foreignKey: "room_id",
        as: "room_booking"
      })
    }
  }
  room.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5,15],
          msg: "room name should be filled with minimum 5 character maximum 15"
        },
        notNull: {
          args: true,
          msg: "Cannot be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};