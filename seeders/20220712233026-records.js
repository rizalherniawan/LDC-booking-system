'use strict';

const generateUID = require("../handler/idHandler");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('booking_records', [
      {
        user_id: 2,
        room_id: 2,
        book_code: generateUID(),
        tanggal: "2022-07-13",
        jamMasuk: "12:00",
        jamSelesai: "12:30",
        kegunaan: "Meeting",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        room_id: 2,
        book_code: generateUID(),
        tanggal: "2022-07-13",
        jamMasuk: "13:00",
        jamSelesai: "13:30",
        kegunaan: "Meeting",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.buklkDelete('booking_records', null, {})
  }
};
