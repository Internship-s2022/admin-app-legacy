import { subYears } from 'date-fns';
import Joi from 'joi';

import { AccessRoleType } from 'src/constants';

export const storybookValidation = Joi.object({
  accessRoleType: Joi.string()
    .valid(
      AccessRoleType.ADMIN,
      AccessRoleType.EMPLOYEE,
      AccessRoleType.MANAGER,
      AccessRoleType.SUPER_ADMIN,
    )
    .messages({
      'any.only': 'El rol de acceso debe ser Admin, Employee, Manager o Super Admin',
    }),

  email: Joi.string()
    .regex(/^[a-zA-Z]+\.+[a-zA-Z]+@(radiumrocket.com)$/)
    .messages({
      'string.empty': 'Debes completar este campo para crear un usuario',
      'string.pattern.base': 'El formato debe ser nombre.apellido@radiumrocket.com',
    }),

  firstName: Joi.string()
    .regex(/^[a-zA-ZñáéíóúüÁÉÍÓÚÜ\s]*$/)
    .min(3)
    .messages({
      'string.base': 'El nombre debe contener solo letras',
      'string.pattern.base': 'El nombre debe contener solo letras',
      'string.empty': 'Debes completar este campo para crear un usuario',
      'string.min': 'El nombre debe contener al menos 3 letras',
    })
    .required(),

  lastName: Joi.string()
    .regex(/^[a-zA-ZñáéíóúüÁÉÍÓÚÜ\s]*$/)
    .min(3)
    .messages({
      'string.base': 'El apellido debe contener solo letras',
      'string.pattern.base': 'El apellido debe contener solo letras',
      'string.empty': 'Debes completar este campo para crear un usuario',
      'string.min': 'El apellido debe contener al menos 3 letras',
    })
    .required(),

  date: Joi.date()
    .greater('1-1-1900')
    .less(subYears(new Date(), 18))
    .messages({
      'date.greater': 'La fecha de nacimiento no puede ser anterior al 1900',
      'date.less': 'El usuario debe ser mayor a 18 anos',
      'any.required': 'Debes completar este campo para crear un usuario',
    })
    .required(),
  skills: Joi.array(),

  potentialRole: Joi.any(),
});
