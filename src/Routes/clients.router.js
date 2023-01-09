import { Router } from "express";
import { createClient } from "../Controllers/clients.controller.js";
import { validateClient } from "../Middlewares/clients.middleware.js";

const clientsRouter = Router();

clientsRouter.post("/clients", validateClient, createClient);

export default clientsRouter;