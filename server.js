const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "svc.sel4.cloudtype.app",
  user: "root",
  password: "5191",
  database: "blue_archive",
  port: process.env.DB_PORT || 8000 // 기본 포트는 3306
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.get('/api/students', (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

