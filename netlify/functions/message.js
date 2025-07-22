const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, body: 'Method Not Allowed' };

  const { user_id, message } = JSON.parse(event.body);
  await pool.query('INSERT INTO messages (user_id, message) VALUES ($1, $2)', [user_id, message]);

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
