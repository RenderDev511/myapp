const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.handler = async (event) => {
  const { email, password, username } = JSON.parse(event.body);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      'INSERT INTO users (email, password, username) VALUES ($1, $2, $3)',
      [email, hashedPassword, username]
    );
    return { statusCode: 200, body: JSON.stringify({ message: 'User registered' }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Registration failed' }) };
  }
};
