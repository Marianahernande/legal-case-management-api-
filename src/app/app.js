const express = require('express');

const app = express();

// Middlewares base
app.use(express.json());


// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;