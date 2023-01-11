import repository from "../../src/Repositories/repository.js";

export const newCake = async (req, res) => {

  const cake = req.body;

  try {
    const registeredCake = await repository.getCakeByName(cake.name);
    
    if (registeredCake.rowCount !== 0) {
      return res.status(409).json("Cake already exists");
    }

    await repository.createCake(cake.name, cake.price, cake.description, cake.image);

    res.status(201).send("Cake created successfully");
    
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}