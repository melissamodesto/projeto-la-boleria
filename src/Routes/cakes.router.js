import { Router } from "express";
import { newCake } from "../Controllers/cakes.controller";
import { validateNewCake } from "../Middlewares/cakes.middleware";

const cakesRouter = Router();

cakesRouter.post("/cake", validateNewCake, newCake);

export default cakesRouter;