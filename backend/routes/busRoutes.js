const express = require('express');
const busController = require('../controllers/busController');
const router = express.Router();

router.post('/search', busController.searchBuses);
router.get('/by-date', busController.getBusesByDate);
router.get('/:busId', busController.getBusById);


module.exports = router;

