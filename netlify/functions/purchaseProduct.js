const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.handler = async (event) => {
  const { userId, productId } = JSON.parse(event.body);

  try {
    const userRes = await pool.query('SELECT coins FROM users WHERE id = $1', [userId]);
    const productRes = await pool.query('SELECT price FROM products WHERE id = $1', [productId]);

    if (!userRes.rows[0] || !productRes.rows[0]) {
      return { statusCode: 400, body: JSON.stringify({ error: 'User or Product not found' }) };
    }

    const userCoins = userRes.rows[0].coins;
    const price = productRes.rows[0].price;

    if (userCoins < price) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Insufficient coins' }) };
    }

    await pool.query('UPDATE users SET coins = coins - $1 WHERE id = $2', [price, userId]);
    await pool.query('INSERT INTO purchases (user_id, product_id) VALUES ($1, $2)', [userId, productId]);

    return { statusCode: 200, body: JSON.stringify({ message: 'Purchase successful' }) };

  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Purchase failed' }) };
  }
};
