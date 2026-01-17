const express = require('express');

const app = express();

// Middlewares base
app.use(express.json());

// Rutas principales

const lawyerRoutes = require('./routes/lawyer.routes');
app.use('/api/lawyers', lawyerRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;