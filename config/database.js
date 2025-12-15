const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.resolve('database.sqlite'),
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: path.resolve('database.sqlite'),
    logging: false,
  },
};
