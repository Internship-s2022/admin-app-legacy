import Joi from 'joi';

const createClientValidation = Joi.object({
  name: Joi.string().max(35).required().messages({
    'string.base': 'El nombre del ciente debe ser un string',
    'string.min': 'El nombre  del cliente debe tener al menos 3 letras',
    'string.empty': 'Nombre del cliente es un campo requerido',
  }),

  localContact: Joi.string()
    .min(3)
    .max(35)
    .messages({
      'string.base': 'El contacto de Radium Rocket debe ser un string',
      'string.min': 'El contacto de Radium Rocket debe contener al menos tres letras',
      'string.empty': 'Es requerido ingresar un contacto de Radium Rocket',
    })
    .required(),

  localEmail: Joi.string()
    .regex(/^[a-zA-Z.]+@radiumrocket.com/)
    .min(20)
    .messages({
      'string.pattern.base': 'Email no válido.',
      'string.empty': 'Email es un campo requerido',
      'string.min': 'Email debe contener al menos tres caracteres.',
    })
    .required(),

  clientContact: Joi.string()
    .min(3)
    .max(35)
    .messages({
      'string.base': 'El contacto del cliente debe ser un string',
      'string.min': 'El contacto del cliente debe tener al menos 3 letras',
      'string.empty': 'Es requerido ingresar un contacto del cliente',
    })
    .required(),

  clientEmail: Joi.string()
    .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    .min(20)
    .messages({
      'string.pattern.base': 'Email no válido.',
      'string.empty': 'Email es un campo requerido',
      'string.min': 'Email debe contener al menos tres caracteres.',
    })
    .required(),

  relationshipStart: Joi.date().less('now').messages({
    'date.less': 'Relationship start date must be earlier than now',
  }),

  relationshipEnd: Joi.date().greater(Joi.ref('relationshipStart')).messages({
    'date.greater': 'Fecha de fin debe ser mayor a la fecha de inicio',
  }),

  notes: Joi.string().min(0).max(35).messages({
    'string.base': 'Notes must be a string',
    'string.min': 'Notes must not contain less than 3 letters',
  }),
});

const updateClientValidation = Joi.object({
  name: Joi.string().min(3).max(35).messages({
    'string.base': 'El nombre del ciente debe ser un string',
    'string.min': 'El nombre  del cliente debe tener al menos 3 letras',
    'any.required': 'Nombre es en campo requerido',
  }),

  localContact: Joi.string().min(3).max(35).messages({
    'string.base': 'El contacto de Radium Rocket debe ser un string',
    'string.min': 'El contacto de Radium Rocket debe contener al menos tres letras',
  }),

  localEmail: Joi.string()
    .regex(/^[a-zA-Z.]+@radiumrocket.com/)
    .min(20)
    .messages({
      'string.pattern.base': 'Email no válido.',
      'string.empty': 'Email es un campo requerido',
      'string.min': 'Email debe contener al menos tres caracteres.',
    }),

  clientContact: Joi.string().min(3).max(35).messages({
    'string.base': 'Our local contact name must be a string',
    'string.min': 'Our local contact name must contain more than 3 letters',
  }),

  clientEmail: Joi.string()
    .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    .min(20)
    .messages({
      'string.pattern.base': 'Email no válido.',
      'string.empty': 'Email es un campo requerido',
      'string.min': 'Email debe contener al menos tres caracteres.',
    }),

  relationshipStart: Joi.date().less('now').messages({
    'date.less': 'Relationship start date must be earlier than now',
  }),

  relationshipEnd: Joi.date().greater('now').messages({
    'date.greater': 'Relationship end date must be later than now',
  }),

  notes: Joi.string().min(0).max(35).messages({
    'string.base': 'Notes must be a string',
    'string.min': 'Notes must not contain less than 3 letters',
  }),
});

export default {
  createClientValidation,
  updateClientValidation,
};
