import db from "../../config/db";
import { stripHtml } from "string-strip-html";

export const newCake = async (req, res) => {
  
    const {name, price, description, image} = req.body;

    const cakes = { 
        name: stripHtml(name).result.trim(),

        price: stripHtml(price).result.trim(), 
        
        description: stripHtml(description).result.trim(), 
        
        image: stripHtml(image).result.trim() 
    };
    
  try {
    const registeredCake = await db.query(`
    SELECT name 
    FROM cakes
    WHERE name = $1
    `, [cakes.name]);

    if (registeredCake.rowCount !== 0) {
        return res.status(401).json("Cake already exists");
    }
    
    await db.query(`INSERT INTO cakes (name, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *`, [cakes.name, cakes.price, cakes.description, cakes.image]);

    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}