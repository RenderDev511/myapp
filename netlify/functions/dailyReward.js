const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.handler = async (event) => {
  const { userId } = JSON.parse(event.body);

  try {
    const res = await pool.query('SELECT last_daily FROM users WHERE id = $1', [userId]);
    const lastDaily = res.rows[0].last_daily;
    const now = new Date();

    if (!lastDaily || (now - new Date(lastDaily)) / (1000 * 60 * 60 * 24) >= 1) {
      await pool.query('UPDATE users SET coins = coins + 10, last_daily = $1 WHERE id = $2', [now, userId]);
      return { statusCode: 200, body: JSON.stringify({ message: 'Daily reward claimed', reward: 10 }) };
    } else {
      return { statusCode: 400, body: JSON.stringify({ error: 'Already claimed today' }) };
    }

  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Daily reward failed' }) };
  }
};
