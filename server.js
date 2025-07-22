const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_qN9lR1SAbJkT@ep-rough-fog-aeykznns-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

// تسجيل جديد
app.post('/api/register', async (req, res) => {
  const { email, password, username } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users (email, password, username) VALUES ($1, $2, $3)', [email, hashed, username]);
    res.json({ message: '✅ تم التسجيل بنجاح' });
  } catch {
    res.json({ message: '❌ البريد مسجل مسبقًا' });
  }
});

// تسجيل دخول
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const userResult = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  if(userResult.rows.length === 0) return res.json({ success: false, message: '❌ البريد غير مسجل' });

  const user = userResult.rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if(!valid) return res.json({ success: false, message: '❌ كلمة المرور خاطئة' });

  res.json({ success: true, user: { id: user.id, username: user.username, rank: user.rank } });
});

// إرسال رسالة
app.post('/api/message', async (req, res) => {
  const { user_id, message } = req.body;
  await pool.query('INSERT INTO messages (user_id, message) VALUES ($1, $2)', [user_id, message]);
  res.json({ success: true });
});

// جلب الرسائل
app.get('/api/messages', async (req, res) => {
  const result = await pool.query(`
    SELECT messages.message, users.username, users.rank
    FROM messages
    JOIN users ON messages.user_id = users.id
    ORDER BY messages.created_at DESC
    LIMIT 20
  `);
  res.json({ messages: result.rows });
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
