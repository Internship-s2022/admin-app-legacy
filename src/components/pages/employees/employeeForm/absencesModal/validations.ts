import Joi from 'joi';

import { Motives } from './types';

export const absencesValidations = Joi.object({
  motive: Joi.string().valid(Motives.LICENSE, Motives.STUDY, Motives.VACATIONS).messages({
    'any.only': 'El motivo debe ser por Licencia, Estudio o Vacaciones ',
  }),
}).options({ allowUnknown: true });
