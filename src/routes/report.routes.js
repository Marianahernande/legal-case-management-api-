const { Router } = require('express');
const router = Router();

router.get('/lawyers/:id/cases', (req, res) => {
  res.json({ message: 'lawyer cases report' });
});

module.exports = router;