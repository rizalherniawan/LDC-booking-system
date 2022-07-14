'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_records', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        OnDelete: 'CASCADE',
        references: {
          model: "users",
          key: "id"
        }
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        OnDelete: 'CASCADE',
        references: {
          model: "rooms",
          key: "id"
        }
      },
      book_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tanggal: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      jamMasuk: {
        type: Sequelize.TIME,
        allowNull: false
      },
      jamSelesai: {
        type: Sequelize.TIME,
        allowNull: false
      },
      kegunaan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('booking_records');
  }
};