import Joi from 'joi';

const createClientValidation = Joi.object({
  name: Joi.string().max(35).required().messages({
    'string.base': 'El nombre del ciente debe ser un string',
    'string.min': 'El nombre  del cliente debe tener al menos 3 letras',
    'string.empty': 'Nombre del cliente es un campo requerido',
  }),

  localContact: Joi.object({
    name: Joi.string()
      .min(3)
      .max(35)
      .messages({
        'string.base': 'Our local contact name must be a string',
        'string.min': 'Our local contact name must contain more than 3 letters',
        'string.empty': 'Es requerido ingresar un contacto de Radium Rocket',
      })
      .required(),
    email: Joi.string()
      .regex(/^[a-zA-Z]+\.+[a-zA-Z]+@(radiumrocket.com)$/)
      .min(20)
      .trim()
      .messages({
        'string.pattern.base': 'Utilice un email válido',
        'string.empty': 'Debes completar este campo para crear un cliente',
        'string.min': 'El email debe contener al menos 3 letras',
      })
      .required(),
  }),

  clientContact: Joi.object({
    name: Joi.string()
      .min(3)
      .max(35)
      .messages({
        'string.base': 'El contacto del cliente debe ser un string',
        'string.min': 'El contacto del cliente debe tener al menos 3 letras',
        'string.empty': 'Es requerido ingresar un contacto del cliente',
      })
      .required(),
    email: Joi.string()
      .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .messages({
        'string.pattern.base': 'Utilice un email válido',
        'string.empty': 'Debes completar este campo para crear un cliente',
      })
      .required(),
  }),

  relationshipStart: Joi.date().less('now').messages({
    'date.less': 'La fecha de inicio debe ser menor que la fecha actual',
  }),

  relationshipEnd: Joi.date().greater(Joi.ref('relationshipStart')).messages({
    'date.greater': 'Fecha de fin debe ser mayor a la fecha de inicio',
  }),

  notes: Joi.string().min(3).max(35).messages({
    'string.base': 'Notas tiene que ser un string',
    'string.min': 'Notes debe contener más de  3 letras',
    'string.max': 'Notes debe contener menos de  35 letras',
  }),

  isActive: Joi.boolean().required(),
});

const updateClientValidation = Joi.object({
  name: Joi.string().max(35).messages({
    'string.base': 'El nombre del ciente debe ser un string',
    'string.min': 'El nombre  del cliente debe tener al menos 3 letras',
  }),

  localContact: Joi.string().min(3).max(35).messages({
    'string.base': 'El contacto de Radium Rocket debe ser un string',
    'string.min': 'El contacto de Radium Rocket debe contener al menos tres letras',
  }),

  localEmail: Joi.string()
    .regex(/^[a-zA-Z]+\.+[a-zA-Z]+@(radiumrocket.com)$/)
    .min(20)
    .trim()
    .messages({
      'string.pattern.base': 'Utilice un email válido',
      'string.empty': 'Debes completar este campo para crear un cliente',
      'string.min': 'El email debe contener al menos 3 letras',
    }),

  clientContact: Joi.string().min(3).max(35).messages({
    'string.base': 'El contacto del cliente debe ser un string',
    'string.min': 'El contacto del cliente debe tener al menos 3 letras',
  }),

  clientEmail: Joi.string()
    .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    .min(20)
    .messages({
      'string.pattern.base': 'Email no válido.',
      'string.min': 'Email debe contener al menos tres caracteres.',
    }),

  relationshipStart: Joi.date().less('now').messages({
    'date.less': 'La fecha de inicio debe ser menor que la fecha actual',
  }),

  relationshipEnd: Joi.date().greater(Joi.ref('relationshipStart')).messages({
    'date.greater': 'Fecha de fin debe ser mayor a la fecha de inicio',
  }),

  notes: Joi.string().min(3).max(35).messages({
    'string.base': 'Notas tiene que ser un string',
    'string.min': 'Notes debe contener más de  3 letras',
    'string.max': 'Notes no debe contener más de  35 letras',
  }),

  isActive: Joi.boolean(),
});

export default {
  createClientValidation,
  updateClientValidation,
};
