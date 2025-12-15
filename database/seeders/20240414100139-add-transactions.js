'use strict';

const { faker } = require('@faker-js/faker/locale/af_ZA');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    function delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
    const listTransactions = [];
    const services = [
      {
        name: 'cuci-lipat',
        price: '6000',
      },
      {
        name: 'cuci-komplit',
        price: '8000',
      },
      {
        name: 'setrika',
        price: '5000',
      },
      {
        name: 'seprai-3s-nomor-3/4',
        price: '10000',
      },
      {
        name: 'seprai-3s-nomor-2',
        price: '15000',
      },
      {
        name: 'seprai-4s-nomor-1',
        price: '20000',
      },
      {
        name: 'selimut-nomor-3/4',
        price: '10000',
      },
      {
        name: 'selimut-nomor-2',
        price: '15000',
      },
      {
        name: 'selimut-nomor-1',
        price: '20000',
      },
      {
        name: 'selimut-double-nomor-3/4',
        price: '30000',
      },
      {
        name: 'selimut-double-nomor-2',
        price: '40000',
      },
      {
        name: 'selimut-double-nomor-1',
        price: '50000',
      },
    ];
    const statusList = ['Paid', 'belum-bayar', 'bayar-sebagian'];
    for (let i = 0; i < 500; i++) {
      const idService = faker.number.int({ min: 0, max: services.length - 1 });
      const weight = faker.number.int({ min: 1, max: 20 });
      const statusIdx = faker.number.int({ min: 0, max: 2 });
      const status = statusList[statusIdx];
      const price = parseInt(services[idService].price) * weight;
      const amountPaymentList = [price, price - 1000, price - 2000];
      const amountPayment =
        status == 'belum-bayar'
          ? 0
          : status == 'Paid'
          ? price
          : amountPaymentList[faker.number.int({ min: 1, max: 2 })];
      const dateDone = faker.date.between({
        from: '2024-04-15T00:00:00.000Z',
        to: '2024-04-30T00:00:00.000Z',
      });
      const dateIn = faker.date.between({
        from: '2024-04-01T00:00:00.000Z',
        to: '2024-04-15T00:00:00.000Z',
      });
      delay(500);
      listTransactions.push({
        transactionId: 'N' + Date.now(),
        notaId: '100' + i.toString(),
        weight: weight,
        service: services[idService].name,
        price: price,
        amountPayment: amountPayment,
        perprice: services[idService].price,
        name: faker.person.fullName(),
        noTelp: '08' + faker.string.numeric(10),
        address: faker.location.streetAddress(),
        createdBy: 'papa',
        fkAuthor: 1,
        dateIn: dateIn,
        dateOut: null,
        dateDone: dateDone,
        datePayment:
          status == 'belum-bayar' || status == null ? null : dateDone,
        status: status,
        notes: 'note',
        cashier: 'dodo',
        deletedAt: null,
        createdAt: dateIn,
      });
    }
    await queryInterface.bulkInsert('transactions', [...listTransactions], {});
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
