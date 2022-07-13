'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booking_record.belongsTo(models.room,{
        foreignKey: "room_id",
        as: "booking_room"
      })

      booking_record.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "booking_user"
      })
    }
  }
  booking_record.init({
    tanggal: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          args: true,
          msg: "Only allow date format"
        },
        notNull: {
          args: true,
          msg: "cannot be empty"
        }
      }
    },
    jamMasuk: {
      allowNull: false,
      type: DataTypes.TIME,
      validate: {
        notNull: {
          args: true,
          msg: "cannot be empty"
        }
      }
    },
    jamSelesai: {
      allowNull: false,
      type: DataTypes.TIME,
      validate: {
        notNull: {
          args: true,
          msg: "cannot be empty"
        }
      }
    },
    kegunaan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5,15],
          msg: "should be filled with minimum 5 character maximum 15"
        },
        notNull: {
          args: true,
          msg: "Cannot be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'booking_record',
    tableName: 'booking_records'
  });
  return booking_record;
};