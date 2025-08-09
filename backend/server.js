const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Load config from environment or .env file
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'user_app';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// simple healthcheck
app.get('/', (req, res) => res.json({ status: 'ok' }));

app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (firstname, lastname, username, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [firstname, lastname, username, email, hashed], (err, results) => {
      if (err) {
        // handle duplicate keys nicely
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'User registered successfully', id: results.insertId });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
