'use strict';

require('dotenv').config()
const bcrypt = require('bcrypt')

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
    await queryInterface.bulkInsert('users',[
    {
      username: 'admin01',
      password: await bcrypt.hash("password", parseInt(process.env.SALT)),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'user01',
      password: await bcrypt.hash("password", parseInt(process.env.SALT)),
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'user02',
      password: await bcrypt.hash("password", parseInt(process.env.SALT)),
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'user03',
      password: await bcrypt.hash("password", parseInt(process.env.SALT)),
      role: "user",
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
    await queryInterface.bulkDelete('users', null, {})
  }
};
