const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class AuthService {
  async login(username, password) {
    // Buscar el usuario por username
    const user = await User.findOne({ 
      where: { username } 
    });

    // Si no existe el usuario
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Si el usuario está inactivo
    if (!user.isActive) {
      throw new Error('User is inactive');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generar el token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Retornar token y datos del usuario (sin la contraseña)
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}

module.exports = new AuthService();