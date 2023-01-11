import repository from "../../src/Repositories/repository.js";

export async function createOrder(req, res) {

    const { clientId, cakeId, quantity } = req.body;

    try {
        const client = await repository.getClientById(clientId);

        if (client.rowCount === 0) {
            return res.status(404).send("Client not found");
        }

        const cakePrice = await repository.getCakePriceById(cakeId);

        if (cakePrice.rowCount === 0) {
            return res.status(404).send("Cake not found");
        }

        const totalPrice = cakePrice.rows[0].price * quantity;

        await repository.createOrder(clientId, cakeId, quantity, totalPrice);

        res.status(201).send("Order created successfully");

    } catch (err) {
        console.error(err.message);
        return res.sendStatus(500);
    }
}

export async function getOrders(req, res) {

    let date = req.query.date;

    try {
        const ordersData = await repository.getOrders(date);

        if (ordersData.rowCount === 0) {
            return res.status(404).send("No orders found");
        }

        const orders = ordersData.rows.map(
            order => (
                {
                    client: {
                        id: order.orderId,
                        name: order.clientName,
                        address: order.clientAddress,
                        phone: order.clientPhone
                    },

                    cake: {
                        id: order.cakeId,
                        name: order.cakeName,
                        price: order.cakePrice,
                        description: order.cakeDescription,
                        image: order.cakeImage
                    },

                    orderId: order.orderId,
                    quantity: order.quantity,
                    createdAt: order.createdAt,
                    totalPrice: order.totalPrice,
                }
            )
        )

        res.status(200).json(orders);

    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
}

export async function getOrderById(req, res) {

    const orderId = req.params.id;

    try {
        const orderData = await repository.getOrderById(orderId);

        if (orderData.rowCount === 0) {
            return res.status(404).send("Order not found");
        }

        const order = orderData.rows.map(
            order => (
                {
                    client: {
                        id: order.orderId,
                        name: order.clientName,
                        address: order.clientAddress,
                        phone: order.clientPhone
                    },

                    cake: {
                        id: order.cakeId,
                        name: order.cakeName,
                        price: order.cakePrice,
                        description: order.cakeDescription,
                        image: order.cakeImage
                    },

                    orderId: order.orderId,
                    quantity: order.quantity,
                    createdAt: order.createdAt,
                    totalPrice: order.totalPrice,
                }
            )
        )

        res.status(200).json(order);

    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
}

export async function getOrdersByClient(req, res) {

    const clientId = req.params.id;

    try {
        const ordersData = await repository.getOrdersByClient(clientId);

        if (ordersData.rowCount === 0) {
            return res.status(404).send("No orders found");
        }

        const orders = ordersData.rows.map(
            order => (
                {
                    client: {
                        id: order.orderId,
                        name: order.clientName,
                        address: order.clientAddress,
                        phone: order.clientPhone
                    },

                    cake: {
                        id: order.cakeId,
                        name: order.cakeName,
                        price: order.cakePrice,
                        description: order.cakeDescription,
                        image: order.cakeImage
                    },

                    orderId: order.orderId,
                    quantity: order.quantity,
                    createdAt: order.createdAt,
                    totalPrice: order.totalPrice,
                }
            )
        )

        res.status(200).json(orders);

    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
}