import Joi from 'joi';

import { AccessRoleType } from 'src/constants';
export const userValidation = Joi.object({
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
    .min(20)
    .trim()
    .messages({
      'string.pattern.base': 'Formato de email no es válido',
      'string.empty': 'Este campo es requerido',
      'string.min': 'El email debe contener al menos 3 letras',
    })
    .required(),

  firstName: Joi.string()
    .min(3)
    .max(35)
    .regex(/^[a-zA-Z\s]*$/)
    .trim()
    .messages({
      'string.min': 'El nombre debe contener al menos 3 letras',
      'string.empty': 'Este campo es requerido',
      'string.max': 'El nombre debe tener máximo 35 letras',
      'string.pattern.base': 'El nombre debe contener solo letras',
    })
    .required(),

  lastName: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .min(3)
    .max(35)
    .trim()
    .messages({
      'string.pattern.base': 'El apellido debe contener solo letras',
      'string.empty': 'Este campo es requerido',
      'string.min': 'El apellido debe contener al menos 3 letras',
      'string.max': 'El apellido debe tener máximo 35 letras',
    })
    .required(),

  location: Joi.string()
    .min(3)
    .regex(/^[a-zA-Z0-9 ]*$/)
    .trim()
    .messages({
      'string.pattern.base': 'Formato de localidad no es válido',
      'string.empty': 'Este campo es requerido',
      'string.min': 'El nombre de la localidad debe tener al menos 3 letras',
    })
    .required(),

  birthDate: Joi.date()
    .less(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
    .messages({
      'date.base': 'El formato de fecha debe ser aaaa/mm/dd',
      'date.less': 'El usuario debe ser mayor a 18 años',
      'any.required': 'Este campo es requerido',
    })
    .required(),
}).options({ allowUnknown: true });
