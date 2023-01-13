import { subYears } from 'date-fns';
import Joi from 'joi';

import { AccessRoleType } from 'src/constants';
export const userValidation = (userEmailValidation) => {
  return Joi.object({
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
      .custom((value, helper) => {
        if (value && userEmailValidation) {
          return helper.error('any.invalid');
        }
      })
      .messages({
        'string.empty': 'Este campo es requerido',
        'string.min': 'El email debe contener al menos 3 letras',
        'any.invalid': 'Email ya registrado',
        'string.pattern.base': 'El formato debe ser nombre.apellido@radiumrocket.com',
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
      .max(30)
      .regex(/^[a-zA-Z0-9ñáéíóúüÁÉÍÓÚÜ ]*$/)
      .trim()
      .messages({
        'string.pattern.base': 'El formato de localidad no es válido',
        'string.empty': 'Este campo es requerido',
        'string.min': 'La localidad debe tener al menos 3 letras',
        'string.max': 'La localidad debe tener máximo 30 caracteres',
      })
      .required(),

    birthDate: Joi.date()
      .greater('01-01-1930')
      .less(subYears(new Date(), 18))
      .messages({
        'date.greater': 'La fecha debe ser posterior a 01-01-1930',
        'date.less': 'El usuario debe ser mayor a 18 años',
        'date.base': 'Este campo es requerido. Formato dd/mm/aaaa',
      })
      .required(),
  }).options({ allowUnknown: true });
};
