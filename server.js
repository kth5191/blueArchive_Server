const express = require('express');
const mysql = require('mysql2/promise'); // promise 기반 mysql2 사용
const cors = require('cors');

const app = express();
app.use(cors());

// MySQL Connection Pool 설정
const pool = mysql.createPool({
  host: "svc.sel4.cloudtype.app",
  user: "root",
  password: "5191",
  database: "blue_archive",
  port: process.env.DB_PORT || 3306, // MySQL 기본 포트 3306
  waitForConnections: true,
  connectionLimit: 30, // 최대 연결 수
  queueLimit: 0 // 무제한 대기열
});

// GET /api/students 엔드포인트
app.get('/api/students', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 서버 실행
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
