import cakeSchema from "../Schemas/cakes.schema.js";

export const validateCake = (req, res, next) => {

    const {error} = cakeSchema.validate(req.body);
    
    if (error) {
        if (error.details[0].message.includes("name")) {
            return res.status(400).json("Name is required");
        }
        if (error.details[0].message.includes("price")) {
            return res.status(400).json("Price is required");
        }
        if (error.details[0].message.includes("description")) {
            return res.status(400).json("Description is required");
        }
        if (error.details[0].message.includes("image")) {
            return res.status(400).json("Image is required");
        }
    }
        
    next();
}