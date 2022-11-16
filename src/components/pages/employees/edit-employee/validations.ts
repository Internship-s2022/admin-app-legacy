import Joi from 'joi';

import { Seniority } from '../types';

const employeeValidations = Joi.object({
  skills: Joi.array().items(Joi.string().min(1).max(35)).messages({
    'string.min': 'Las skills deben contener al menos un caracter',
    'string.max': 'Las skills deben contener menos de 35 caracteres',
  }),

  seniority: Joi.string().valid(Seniority.JR, Seniority.SR, Seniority.SSR).messages({
    'any.only': 'El seniority debe ser JR, SR, SSR or TRAINEE',
  }),
}).options({ allowUnknown: true });

export default employeeValidations;
