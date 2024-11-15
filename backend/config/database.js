const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bookingdb', 'root', 'manager', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
