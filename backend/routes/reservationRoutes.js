const express = require('express');
const reservationController = require('../controllers/reservationController');
const router = express.Router();

router.post('/book', reservationController.bookSeat);


// New endpoint for getting booked seats
router.get('/booked-seats/:busId', reservationController.getBookedSeats);


module.exports = router;
