const express = require('express');
const router = express.Router();
const lawyerController = require('../controllers/lawyer.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validation.middleware');
const { createLawyerSchema } = require('../validations/lawyer.validation');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// POST /api/lawyers - Crear abogado (con validación)
router.post('/', validate(createLawyerSchema), lawyerController.create);

// GET /api/lawyers - Listar abogados
router.get('/', lawyerController.getAll);

// GET /api/lawyers/:id - Obtener abogado por ID
router.get('/:id', lawyerController.getById);

module.exports = router;