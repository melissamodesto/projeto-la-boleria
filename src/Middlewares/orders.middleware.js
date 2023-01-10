import orderSchema from "../Schemas/orders.schema.js";

const validateOrder = (req, res, next) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.sendStatus(400);
    }
    next();
}

export default validateOrder;