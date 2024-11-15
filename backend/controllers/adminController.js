const Bus = require('../models/bus');
const Reservation = require('../models/reservation');

exports.addBus = async (req, res) => {
  try {
    const { bus_name, bus_type, arival_time, departure_time, distance, end_location, fare, start_location, total_seates } = req.body;
    const bus = await Bus.create({
      bus_name,
      bus_type,
      arival_time,
      departure_time,
      distance,
      end_location,
      fare,
      start_location,
      total_seates,
      booked_seates: 0 // Default value for booked_seates
    });
    res.status(201).json({ message: 'Bus added successfully', bus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const { busId } = req.params;
    await Bus.destroy({ where: { bus_id: busId } });
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


