import express from 'express';
import cors from 'cors';
import dotenv from  'dotenv';
import cakesRouter from './src/Routes/cakes.router.js';
import clientsRouter from './src/Routes/clients.router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/cakes', cakesRouter);
app.use('/clients', clientsRouter);


dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);