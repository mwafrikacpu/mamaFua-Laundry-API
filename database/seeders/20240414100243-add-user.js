'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'accounts',
      [
        {
          nik: faker.string.numeric(16),
          email: 'papa@gmail.com',
          name: 'Sigit Pramono',
          address: faker.location.streetAddress(),
          role: 'admin',
          noTelp: '08' + faker.string.numeric(10),
          password: bcrypt.hashSync('papa1234', 10),
        },
        {
          nik: faker.string.numeric(16),
          email: 'admin2@gmail.com',
          name: 'Junaedi Akbar',
          address: faker.location.streetAddress(),
          role: 'admin',
          noTelp: '08' + faker.string.numeric(10),
          password: bcrypt.hashSync('admin1234', 10),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
