const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Always use env variables
  ssl: { rejectUnauthorized: false }
});

exports.handler = async function(event, context) {
  try {
    const result = await pool.query('SELECT opentime FROM opening ORDER BY id LIMIT 1');
    if (result.rows.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ opentime: result.rows[0].opentime })
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Opening time not found' })
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database error' })
    };
  }
};
