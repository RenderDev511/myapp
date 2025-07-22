const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async () => {
  const result = await pool.query(`
    SELECT messages.message, users.username, users.rank
    FROM messages
    JOIN users ON messages.user_id = users.id
    ORDER BY messages.created_at DESC
    LIMIT 20
  `);

  return {
    statusCode: 200,
    body: JSON.stringify({ messages: result.rows })
  };
};
