const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const oracledb = require('oracledb');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `INSERT INTO users (username, USER_PASSWORD) VALUES (:username, :password)`,
        { username: username, password: hashedPassword },
        { autoCommit: true }
      );

      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error registering user' });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `SELECT USER_ID, username, USER_PASSWORD FROM users WHERE username = :username`,
        { username: username }
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = result.rows[0];

      // Compare the password
      const validPassword = await bcrypt.compare(password, user[2]);

      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create and assign a token
      const token = jwt.sign({ id: user[0], username: user[1] }, 'your_secret_key'); // Replace with a strong secret key
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging in' });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};