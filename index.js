import express from 'express';
import cors from 'cors';
import cakesRouter from './src/Routes/cakes.router.js';
import clientsRouter from './src/Routes/clients.router.js';
import ordersRouter from './src/Routes/orders.router.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/cakes', cakesRouter);
app.use('/clients', clientsRouter);
app.use('/orders', ordersRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);