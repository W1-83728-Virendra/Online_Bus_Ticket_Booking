const Reservation = require('../models/reservation');
const Bus = require('../models/bus');


exports.processPayment = async (req, res) => {
  try {
    const { reservationId, paymentMethod } = req.body;

    // Find the reservation by primary key
    const reservationDetails = await Reservation.findByPk(reservationId, {
      include: [Bus]
    });

    // Check if the reservation was found
    if (!reservationDetails) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    // Process payment logic here
    res.status(200).json({
      busId: reservationDetails.bus_bus_id,
      seats: [reservationDetails.seat_number],
      passengerDetails: {
        name: reservationDetails.passenger_name,
        age: reservationDetails.passenger_age,
        gender: reservationDetails.passenger_gender,
        boardingStop: reservationDetails.boarding_stop,
        alightingStop: reservationDetails.alighting_stop
      },
      busDetails: {
        bus_name: reservationDetails.Bus.bus_name,
        bus_type: reservationDetails.Bus.bus_type,
        arival_time: reservationDetails.Bus.arival_time,
        fare: reservationDetails.Bus.fare,
        departure_time: reservationDetails.Bus.departure_time
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
