import Joi from 'joi';

import { AccessRoleType } from 'src/constants';
export const userValidation = Joi.object({
  firebaseUid: Joi.string()
    .min(3)
    .max(35)
    .messages({
      'string.pattern': 'Tienes que utilizar un firebaseUid valido',
      'string.empty': 'FirebaseUid es un campo requerido',
      'string.min': 'FirebaseUid debe contener al menos 3 caracteres',
    })
    .required(),

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
    .regex(/^[a-zA-Z.]+@radiumrocket.com/)
    .min(20)
    .messages({
      'string.pattern.base': 'Utilice un mail valido',
      'string.empty': 'Debes completar este campo para crear un usuario',
      'string.min': 'El mail debe contener al menos 3 letras',
    }),

  firstName: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .min(3)
    .trim()
    .messages({
      'string.pattern.base': 'El nombre debe contener solo letras',
      'string.empty': 'Debes completar este campo para crear un usuario',
      'string.min': 'El nombre debe contener al menos 3 letras',
    })
    .required(),

  lastName: Joi.string()
    .regex(/^[a-zA-Z\s]*$/)
    .min(3)
    .trim()
    .messages({
      'string.pattern.base': 'El apellido debe contener solo letras',
      'string.empty': 'Debes completar este campo para crear un usuario',
      'string.min': 'El apellido debe contener al menos 3 letras',
    })
    .required(),

  location: Joi.string()
    .min(3)
    .alphanum()
    .messages({
      'string.base': 'Ingrese un nombre de localidad valido. Sin caracteres especiales',
      'string.empty': 'Debes completar este campo para crear un usuario',
      'string.min': 'El nombre de la localidad debe tener al menos 3 letras',
    })
    .required(),

  birthDate: Joi.date()
    .greater('1-1-1900')
    .less(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
    .messages({
      'date.greater': 'La fecha de nacimiento no puede ser anterior al 1900',
      'date.less': 'El usuario debe ser mayor a 18 anos',
      'any.required': 'Debes completar este campo para crear un usuario',
    })
    .required(),
  isActive: Joi.boolean().required(),
});
