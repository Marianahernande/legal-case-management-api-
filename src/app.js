const express = require('express');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const lawyerRoutes = require('./routes/lawyer.routes');
const legalCaseRoutes = require('./routes/legalCase.routes');
const reportRoutes = require('./routes/report.routes');

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/legal-cases', legalCaseRoutes);
app.use('/api/reports', reportRoutes);

// Manejo de rutas no encontradas (404)
app.use(notFound);

// Manejo centralizado de errores
app.use(errorHandler);

module.exports = app;