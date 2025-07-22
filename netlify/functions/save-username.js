const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async function(event) {
  const { google_id, username } = JSON.parse(event.body);
  await pool.query('INSERT INTO users (google_id, username) VALUES ($1, $2) ON CONFLICT (google_id) DO UPDATE SET username = $2', [google_id, username]);
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
