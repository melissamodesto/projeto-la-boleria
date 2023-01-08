import Joi from "joi";

const cakeSchema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    price: Joi.number().required().greater(0),
    description: Joi.string().required(),
    image: Joi.string().required().uri()
});

export default cakeSchema;