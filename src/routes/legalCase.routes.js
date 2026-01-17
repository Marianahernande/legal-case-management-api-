const express = require('express');
const router = express.Router();
const legalCaseController = require('../controllers/legalCase.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validation.middleware');
const { 
  createLegalCaseSchema, 
  assignLawyerSchema,
  transferCaseSchema 
} = require('../validations/legalCase.validation');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// POST /api/legal-cases - Crear caso legal
router.post('/', validate(createLegalCaseSchema), legalCaseController.create);

// GET /api/legal-cases - Listar casos legales
router.get('/', legalCaseController.getAll);

// GET /api/legal-cases/:id - Obtener caso por ID
router.get('/:id', legalCaseController.getById);

// PUT /api/legal-cases/:id/assign - Asignar abogado a caso
router.put('/:id/assign', validate(assignLawyerSchema), legalCaseController.assignLawyer);

// PUT /api/legal-cases/:id/transfer - Transferir caso a otro abogado
router.put('/:id/transfer', validate(transferCaseSchema), legalCaseController.transferCase);

module.exports = router;