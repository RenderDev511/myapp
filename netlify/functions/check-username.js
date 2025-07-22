const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async function(event) {
  const { google_id } = JSON.parse(event.body);
  const result = await pool.query('SELECT username FROM users WHERE google_id = $1', [google_id]);
  return {
    statusCode: 200,
    body: JSON.stringify({ username: result.rows[0]?.username || null })
  };
};
