const NODE_ENV = process.env.NODE_ENV || 'local';
require('dotenv').config({
  path: `${process.cwd()}/.env.${NODE_ENV}`,
});
const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;

module.exports = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  port:  3306,
  dialect: 'mysql',
};
