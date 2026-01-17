const { Router } = require('express');
const router = Router();

const authController = require('../controllers/auth.controller');

// POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;