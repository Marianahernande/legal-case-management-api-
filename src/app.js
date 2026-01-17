const express = require('express');

const app = express();

// Middlewares base
app.use(express.json());

// Rutas principales
const authRoutes = require('./routes/auth.routes');
const lawyerRoutes = require('./routes/lawyer.routes');
const legalCaseRoutes = require('./routes/legalCase.routes');

app.use('/api/auth', authRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/legal-cases', legalCaseRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;