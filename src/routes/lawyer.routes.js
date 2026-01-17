const express = require('express');
const router = express.Router();


// Ruta para listar abogados
router.get('/', (req, res) => {
  // Por ahora, datos de prueba (hardcoded)
  const abogados = [
    {
      id: 1,
      name: 'Carlos Pérez',
      email: 'carlos@bufete.com',
      specialization: 'Derecho Laboral'
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria@bufete.com',
      specialization: 'Derecho Civil'
    }
  ];

  res.json({
    success: true,
    data: abogados
  });
});

module.exports = router;
