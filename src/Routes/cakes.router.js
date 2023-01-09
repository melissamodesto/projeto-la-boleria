import { Router } from "express";
import { newCake } from "../Controllers/cakes.controller";
import { validateNewCake } from "../Middlewares/cakes.middleware";

const cakesRouter = Router();

cakesRouter.post("/cakes", validateNewCake, newCake);

export default cakesRouter;