const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async function(event) {
  if (event.httpMethod === "GET") {
    const result = await pool.query(`
      SELECT users.username, messages.message
      FROM messages
      JOIN users ON messages.user_id = users.id
      ORDER BY messages.created_at DESC
      LIMIT 20
    `);
    return {
      statusCode: 200,
      body: JSON.stringify({ messages: result.rows })
    };
  }

  if (event.httpMethod === "POST") {
    const { google_id, message } = JSON.parse(event.body);
    const user = await pool.query('SELECT id FROM users WHERE google_id = $1', [google_id]);
    if (user.rows.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'User not found' }) };
    }
    await pool.query('INSERT INTO messages (user_id, message) VALUES ($1, $2)', [user.rows[0].id, message]);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
