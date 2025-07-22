const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  try {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = res.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      return { statusCode: 200, body: JSON.stringify({ message: 'Login success', user }) };
    } else {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
    }
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Login failed' }) };
  }
};
