const express = require('express');
const router = express.Router();
const lawyerController = require('../controllers/lawyer.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// POST /api/lawyers - Crear abogado
router.post('/', lawyerController.create);

// GET /api/lawyers - Listar abogados
router.get('/', lawyerController.getAll);

// GET /api/lawyers/:id - Obtener abogado por ID
router.get('/:id', lawyerController.getById);

module.exports = router;