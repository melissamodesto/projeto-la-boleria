import joi from 'joi';

const orderSchema = joi.object().keys({
    clientId: joi.number().required(),
    cakeId: joi.number().required(),
    quantity: joi.number().required().min(1),
    totalPrice: joi.number().required().min(0),

});

export default orderSchema;