const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.handler = async () => {
  try {
    const res = await pool.query('SELECT * FROM products');
    return {
      statusCode: 200,
      body: JSON.stringify(res.rows)
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch products' }) };
  }
};
