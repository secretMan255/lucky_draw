import Joi from 'joi';

export const GetWinnerRequest = Joi.object({
    gift_id: Joi.number().required(),
    user_id: Joi.number().required()
})