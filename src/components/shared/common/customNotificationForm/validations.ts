import Joi from 'joi';

const customNotificationsValidations = Joi.object({
  customMessage: Joi.string().min(3).max(50).trim().messages({
    'string.empty': 'Este campo es requerido',
    'string.base': 'El mensaje debe ser una cadena de carácteres',
    'string.min': 'El mensaje debe contener al menos 3 caracteres',
    'string.max': 'El mensaje debe contener menos de 50 caracteres',
  }),
  date: Joi.date().greater('now').messages({
    'date.greater': 'La fecha de la notificacion debe ser posterior a hoy',
  }),
});

export default customNotificationsValidations;
