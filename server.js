const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_ucK5Xb8sBLMD@ep-damp-hall-aem3ujkj-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

pool.connect()
  .then(client => {
    console.log("✅ Connected to Neon database");
    client.release();
  })
  .catch(err => console.error("DB connection error", err.stack));

app.get('/api/opening-time', async (req, res) => {
  try {
    const result = await pool.query('SELECT opentime FROM opening ORDER BY id LIMIT 1');
    res.json({ opentime: result.rows[0].opentime });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
