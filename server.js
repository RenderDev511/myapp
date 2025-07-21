const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_ucK5Xb8sBLMD@ep-damp-hall-aem3ujkj-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

// Test DB connection
pool.connect()
  .then(client => {
    console.log("Connected to Neon database ✅");
    client.release();
  })
  .catch(err => console.error("DB connection error", err.stack));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
