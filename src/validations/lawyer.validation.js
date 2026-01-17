const Joi = require('joi');

const createLawyerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must not exceed 100 characters',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
  }),
  phone: Joi.string().optional().allow(null, ''),
  specialization: Joi.string().optional().allow(null, ''),
  status: Joi.string().valid('active', 'inactive').default('active'),
});

module.exports = {
  createLawyerSchema,
};