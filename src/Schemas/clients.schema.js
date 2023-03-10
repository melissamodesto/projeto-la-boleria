import joi from 'joi';

const clientSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    address: joi.string().required()
});

export default clientSchema;