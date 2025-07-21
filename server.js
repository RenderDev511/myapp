const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_ucK5Xb8sBLMD@ep-damp-hall-aem3ujkj-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// API to get opening time
app.get('/api/opening-time', async (req, res) => {
  try {
    const result = await pool.query('SELECT opentime FROM opening ORDER BY id LIMIT 1');
    if (result.rows.length > 0) {
      res.json({ opentime: result.rows[0].opentime });
    } else {
      res.status(404).json({ error: 'Opening time not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
