const { Router } = require('express');

const authRoutes = require('./auth.routes');
const lawyerRoutes = require('./lawyer.routes');
const legalCaseRoutes = require('./legalCase.routes');
const reportRoutes = require('./report.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/lawyers', lawyerRoutes);
router.use('/legal-cases', legalCaseRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
