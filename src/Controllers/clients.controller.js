import repository from "../../src/Repositories/repository.js";

export async function createClient (req, res) {
  const client = req.body;

  try {
    
    await repository.createClient(client.name, client.address, client.phone);

    return res.status(201).send("Client created successfully");

  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}

export async function clientOrders (req, res) {
  const clientId = req.params.id;

  try {
    const ordersData = await repository.getOrdersByClientId(clientId);

    if (ordersData.rowCount === 0) {
      return res.status(404).send("No orders found");
    }

    const orders = ordersData.rows.map(
        order => (
            {
                orderId: order.orderId,
                quantity: order.quantity,
                createdAt: order.createdAt,
                totalPrice: order.totalPrice,
                cakeName: order.cakeName
            }
        )
    )

    res.status(200).json(orders.rows);
    
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
}