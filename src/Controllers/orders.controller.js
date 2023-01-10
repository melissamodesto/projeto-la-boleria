import db from "../../config/db.js";
import dayjs from "dayjs";

export const createOrder = async (req, res) => {
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {

        const createdAt = dayjs().format('YYYY-MM-DD HH:mm');

        const clientExists = await db.query(`
            SELECT * FROM clients WHERE id = $1
        `, [clientId]);

        if (clientExists.rows.length === 0) {
            return res.sendStatus(404);
        }

        const cakeExists = await db.query(`
            SELECT * FROM cakes WHERE id = $1
        `, [cakeId]);

        if (cakeExists.rows.length === 0) {
            return res.sendStatus(404);
        }

        await db.query(`
            INSERT INTO orders ("clientId", "cakeId", "quantity", "totalPrice", "createdAt")
            VALUES ($1, $2, $3, $4, $5);
        `, [clientId, cakeId, quantity, totalPrice, createdAt]);

        return res.sendStatus(201);

    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

const formatResult = (rows) => {

    const filterOrders = rows.map(row => {
        const [clientId, clientName, clientAddress, clientPhone, cakeId, cakeName, cakeImage, cakeDescription, cakePrice, quantity, createdAt, totalPrice] = row;

        return {
            client: {
                id: clientId,
                name: clientName,
                address: clientAddress,
                phone: clientPhone,
            },

            cake: {
                id: cakeId,
                name: cakeName,
                image: cakeImage,
                description: cakeDescription,
                price: cakePrice,
            },

            createdAt,
            quantity,
            totalPrice
        }
    });

    return filterOrders;
}

export const getAllOrders = async (req, res) => {

    const dateString = req.query.date;

    try {
        const result = await db.query({
            text: `
            SELECT 
                orders.*,
                cakes.*,
                clients.*
            FROM orders
            JOIN clients ON clients.id=orders."clientId"
            JOIN cakes ON cakes.id=orders."cakeId"
            ${typeof (dateString) === 'string' ? `WHERE orders."createdAt" LIKE '$1'` : ''}
        `,
            rowMode: "array"
        }, typeof (dateString) === 'string' ? [dateString + '%'] : []);

        const filterObject = formatResults(result.rows);

        if (filterObject.length === 0) {
            return res.sendStatus(404);
        }

        return res.send(filterObject).status(200);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const getOrderById = async (req, res) => {

    const id = req.params.id;

    if (!id) {
        return res.sendStatus(400);
    }

    try {
        const result = await db.query({
            text: `
                SELECT 
                    orders.*,
                    cakes.*,
                    clients.*
                FROM orders
                JOIN clients ON clients.id = orders."clientId"
                JOIN cakes ON cakes.id = orders."cakeId"
                WHERE orders.id = $1;
            `,
            rowMode: "array"
            }, [id]);

        if (result.rowCount === 0) {
            return res.sendStatus(404);
        }

        const filterObject = formatResult(result.rows);

        return res.send(filterObject).status(200);
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export const getOrdersByClient = async (req, res) => {

    const id = req.params.id;

    try {

        const clientExists = await db.query(`
            SELECT * FROM clients 
            WHERE id = $1
        `, [id]);

        if (clientExists.rowCount === 0) {

            return res.sendStatus(404);
        }

        const result = await db.query(`
            SELECT 
                orders."id" as "orderId",
                orders."quantity",
                orders."createdAt",
                orders."totalPrice",
                cakes.name AS cakeName
            FROM orders
            JOIN cakes ON cakes.id=orders."cakeId"
            JOIN clients ON cakes.id=orders."clientId"
            WHERE clients."id"=$1
        `, [id]);

        const filterObject = formatResult(result.rows);

        return res.send(filterObject).status(200);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

}