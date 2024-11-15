const express = require('express');
const adminController = require('../controllers/adminController');
const reservationController = require('../controllers/reservationController');
const { isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-bus', isAdmin, adminController.addBus);
router.delete('/delete-bus/:busId', isAdmin, adminController.deleteBus);
router.get('/reservations', isAdmin, reservationController.getReservationsByBusAndDate);



module.exports = router;
