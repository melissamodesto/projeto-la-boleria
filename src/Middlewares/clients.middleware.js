import clientSchema from "../Schemas/clients.schema";

export const validateClient = async (req, res, next) => {
    
    const validation = clientSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(400);
    }

    next();
}