const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/reports/lawyers/:id/cases - Reporte de casos por abogado
router.get('/lawyers/:id/cases', reportController.getLawyerCases);

module.exports = router;