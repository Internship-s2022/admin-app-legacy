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
      'string.pattern.base': 'El formato de email no es válido',
      'string.empty': 'Este campo es requerido',
      'string.min': 'El email debe contener al menos 3 letras',
    })
    .required(),

  firstName: Joi.string()
    .min(3)
    .max(35)
    .regex(/^[a-zA-ZñáéíóúüÁÉÍÓÚÜ\s]*$/)
    .trim()
    .messages({
      'string.min': 'El nombre debe contener al menos 3 letras',
      'string.empty': 'Este campo es requerido',
      'string.max': 'El nombre debe tener máximo 35 letras',
      'string.pattern.base': 'El nombre debe contener sólo letras',
    })
    .required(),

  lastName: Joi.string()
    .regex(/^[a-zA-ZñáéíóúüÁÉÍÓÚÜ\s]*$/)
    .min(3)
    .max(35)
    .trim()
    .messages({
      'string.pattern.base': 'El apellido debe contener sólo letras',
      'string.empty': 'Este campo es requerido',
      'string.min': 'El apellido debe contener al menos 3 letras',
      'string.max': 'El apellido debe tener máximo 35 letras',
    })
    .required(),

  location: Joi.string()
    .min(3)
    .max(15)
    .regex(/^[a-zA-Z0-9ñáéíóúüÁÉÍÓÚÜ ]*$/)
    .trim()
    .messages({
      'string.pattern.base': 'El formato de localidad no es válido',
      'string.empty': 'Este campo es requerido',
      'string.min': 'El nombre de la localidad debe tener al menos 3 letras',
      'string.max': 'El nombre de la localidad no debe tener más de 15 caracteres',
    })
    .required(),

  birthDate: Joi.date()
    .less(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
    .messages({
      'date.less': 'El usuario debe ser mayor a 18 años',
      'date.base': 'Este campo es requerido. Formato dd/mm/aaaa',
    })
    .required(),
}).options({ allowUnknown: true });
