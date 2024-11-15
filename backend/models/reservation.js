const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Bus = require('./bus'); // Import the Bus model

const Reservation = sequelize.define('Reservation', {
  reservation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  alighting_stop: {
    type: DataTypes.STRING,
    allowNull: true
  },
  boarding_stop: {
    type: DataTypes.STRING,
    allowNull: true
  },
  journey_status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  passenger_age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  passenger_gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  passenger_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  seat_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bus_bus_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Bus,
      key: 'bus_id'
    }
  },
  user_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'reservation',
  timestamps: false
});

// Define the association
Reservation.belongsTo(Bus, { foreignKey: 'bus_bus_id' });
Bus.hasMany(Reservation, { foreignKey: 'bus_bus_id' });

module.exports = Reservation;

