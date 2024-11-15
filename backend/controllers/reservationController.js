const { Op } = require('sequelize');
const Reservation = require('../models/reservation');
const Bus = require('../models/bus');

exports.bookSeat = async (req, res) => {
  try {
    const { busId, seats, passengerDetails } = req.body;

    if (!busId || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    const bus = await Bus.findByPk(busId);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    // Check for already booked seats
    const existingReservations = await Reservation.findAll({
      where: {
        bus_bus_id: busId,
        seat_number: seats
      }
    });

    if (existingReservations.length > 0) {
      return res.status(400).json({ error: 'Some seats are already booked' });
    }

    // Create reservations
    const reservations = await Promise.all(
      seats.map((seatNumber, index) => Reservation.create({
        bus_bus_id: busId,
        seat_number: seatNumber,
        passenger_name: passengerDetails[index].name,
        passenger_age: parseInt(passengerDetails[index].age, 10), // Ensure age is a number
        passenger_gender: passengerDetails[index].gender,
        boarding_stop: passengerDetails[index].boardingStop,
        alighting_stop: passengerDetails[index].alightingStop
      }))
    );

    if (reservations.length > 0 && reservations[0].reservation_id) {
      await bus.update({ booked_seates: bus.booked_seates + seats.length });
      res.status(201).json({ reservationId: reservations[0].reservation_id });
    } else {
      res.status(500).json({ error: 'Failed to create reservation' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getBookedSeats = async (req, res) => {
  try {
    const { busId } = req.params;

    const reservations = await Reservation.findAll({
      where: {
        bus_bus_id: busId
      },
      attributes: ['seat_number']
    });

    const bookedSeats = reservations.map(reservation => reservation.seat_number);
    res.json(bookedSeats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getReservationsByBusAndDate = async (req, res) => {
  try {
    const { busId, date } = req.query;

    if (!busId || !date) {
      return res.status(400).json({ error: 'Bus ID and date are required' });
    }

    // Convert the date string to a date object
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    // Find the bus with the given ID
    const bus = await Bus.findByPk(busId);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    // Check if bus's departure_time is within the requested date
    const departureTime = new Date(bus.departure_time);
    if (departureTime < startDate || departureTime >= endDate) {
      return res.status(404).json({ error: 'No reservations for this date' });
    }

    // Find reservations for the bus on the given date
    const reservations = await Reservation.findAll({
      where: {
        bus_bus_id: busId
      },
      include: [
        {
          model: Bus,
          where: {
            departure_time: {
              [Op.between]: [startDate, endDate]
            }
          }
        }
      ]
    });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
