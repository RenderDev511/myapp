const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async function(event, context) {
  if (event.httpMethod === 'GET') {
    // ✅ جلب الرسائل
    try {
      const result = await pool.query('SELECT username, message FROM messages ORDER BY created_at DESC LIMIT 20');
      return {
        statusCode: 200,
        body: JSON.stringify({ messages: result.rows })
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database error' })
      };
    }
  } else if (event.httpMethod === 'POST') {
    // ✅ إضافة رسالة جديدة
    const { username, message } = JSON.parse(event.body);
    try {
      await pool.query('INSERT INTO messages (username, message) VALUES ($1, $2)', [username, message]);
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database error' })
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
};
