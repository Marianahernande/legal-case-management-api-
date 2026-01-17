const authService = require('../services/auth.service');

class AuthController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      // Validación básica
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required',
        });
      }

      // Llamar al servicio
      const result = await authService.login(username, password);

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      // Si es error de credenciales inválidas
      if (error.message === 'Invalid credentials' || error.message === 'User is inactive') {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }
      
      // Otros errores
      next(error);
    }
  }
}

module.exports = new AuthController();
