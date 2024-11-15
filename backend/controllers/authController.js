const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// exports.register = async (req, res) => {
//   try {
//     const { email, first_name, last_name, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       email,
//       first_name,
//       last_name,
//       password: hashedPassword,
//       role
//     });
//     res.status(201).json({ message: 'User created successfully', user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.register = async (req, res) => {
  try {
    const { email, first_name, last_name, password, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      email,
      first_name,
      last_name,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Sequelize validation error
      const messages = error.errors.map(e => e.message);
      res.status(400).json({ message: messages.join(', ') });
    } else {
      // General error
      res.status(500).json({ message: error.message });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.user_id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
