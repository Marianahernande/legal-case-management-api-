const express = require('express');
const router = express.Router();
const legalCaseController = require('../controllers/legalCase.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// POST /api/legal-cases - Crear caso legal
router.post('/', legalCaseController.create);    

// GET /api/legal-cases - Listar casos legales
router.get('/', legalCaseController.getAll);

// GET /api/legal-cases/:id - Obtener caso por ID
router.get('/:id', legalCaseController.getById);

module.exports = router;