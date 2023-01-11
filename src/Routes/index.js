import { Router } from "express";
import cakesRouter from "./cakes.router.js";
import clientsRouter from "./clients.router.js";
import ordersRouter from "./orders.router.js";

const routes = Router();

routes.use(cakesRouter);
routes.use(clientsRouter);
routes.use(ordersRouter);

export default routes;