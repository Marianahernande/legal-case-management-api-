const { Router } = require('express');
const router = Router();

router.post('/', (req, res) => {
  res.json({ message: 'create legal case' });
});

router.get('/', (req, res) => {
  res.json({ message: 'list legal cases' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'get legal case by id' });
});

router.put('/:id/assign', (req, res) => {
  res.json({ message: 'assign lawyer' });
});

router.put('/:id/transfer', (req, res) => {
  res.json({ message: 'transfer case' });
});

module.exports = router;
