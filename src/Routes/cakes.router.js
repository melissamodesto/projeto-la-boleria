import { Router } from "express";
import { newCake } from "../Controllers/cakes.controller.js";
import { validateCake } from "../Middlewares/cakes.middlewares.js";

export const cakesRouter = Router();

cakesRouter.post("/cakes", validateCake, newCake);

export default cakesRouter;
