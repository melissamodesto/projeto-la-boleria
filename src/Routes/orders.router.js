import { Router } from "express";
import { createOrder, getAllOrders, getOrderById, getOrdersByClient } from "../Controllers/orders.controller.js";
import validateOrder from "../Middlewares/orders.middleware.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateOrder, createOrder);
ordersRouter.get("/orders", getAllOrders);
ordersRouter.get("/orders/:id", getOrderById);
ordersRouter.get("/clients/:id/orders", getOrdersByClient);

export default ordersRouter;