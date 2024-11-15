const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bus = sequelize.define('Bus', {
  bus_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bus_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bus_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  arival_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  departure_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  distance: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  end_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fare: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total_seates: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  booked_seates: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'bus',
  timestamps: false
});

module.exports = Bus;
