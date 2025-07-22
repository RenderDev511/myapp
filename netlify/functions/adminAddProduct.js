const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.handler = async (event) => {
  const { name, description, price, file_url, adminKey } = JSON.parse(event.body);

  if (adminKey !== process.env.ADMIN_KEY) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    await pool.query(
      'INSERT INTO products (name, description, price, file_url) VALUES ($1, $2, $3, $4)',
      [name, description, price, file_url]
    );

    return { statusCode: 200, body: JSON.stringify({ message: 'Product added' }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Add product failed' }) };
  }
};
