const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, body: 'Method Not Allowed' };

  const { email, password } = JSON.parse(event.body);
  const userResult = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  if(userResult.rows.length === 0)
    return { statusCode: 200, body: JSON.stringify({ success: false, message: '❌ البريد غير مسجل' }) };

  const user = userResult.rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if(!valid)
    return { statusCode: 200, body: JSON.stringify({ success: false, message: '❌ كلمة المرور خاطئة' }) };

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, user: { id: user.id, username: user.username, rank: user.rank } })
  };
};
