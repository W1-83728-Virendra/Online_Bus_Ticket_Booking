const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const busRoutes = require('./routes/busRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
  origin: '*', // Adjust this as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use('/api/auth', authRoutes);
app.use('/api/bus', busRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

sequelize.sync().then(() => {
  console.log('Database connected and synchronized');
}).catch((error) => {
  console.error('Database connection error:', error);
});

module.exports = app;

