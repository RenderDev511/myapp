const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, body: 'Method Not Allowed' };

  const { email, password, username } = JSON.parse(event.body);
  const hashed = await bcrypt.hash(password, 10);

  try {
    await pool.query('INSERT INTO users (email, password, username) VALUES ($1, $2, $3)', [email, hashed, username]);
    return { statusCode: 200, body: JSON.stringify({ message: '✅ تم التسجيل بنجاح' }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 400, body: JSON.stringify({ message: '❌ البريد مسجل مسبقًا' }) };
  }
};
