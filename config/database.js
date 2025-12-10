const dotenv = require('dotenv');
dotenv.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const mysql2 = require('mysql2');
const db = {
  development: {
    storage: './database.sqlite',
    dialect: 'sqlite'
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    // dialectModule: mysql2,
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    // dialectModule: mysql2,
  },
};
module.exports = db;
