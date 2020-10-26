/*
 *  This file will validate the configuration given be the user.
 *  Created On 26 October 2020
 */

export default Joi =>
    Joi.object({
        username: Joi.string().max(15).required(),
        auth: Joi.object({
            key: Joi.string().min(25).max(25).required(),
            token: Joi.string().min(50).max(50).required(),
            key_secret: Joi.string().min(50).max(50).required(),
            token_secret: Joi.string().min(45).max(45).required(),
        }),
    })
