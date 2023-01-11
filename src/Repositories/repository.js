import db from "../../config/db.js";

async function getCakeByName(name){
    return db.query(
        `SELECT * FROM cakes WHERE name=$1`, [name]
    )
}

async function createCake(name, price, image, description){
    return db.query(
        `INSERT INTO cakes (name, price, image, description) 
         VALUES ($1, $2, $3, $4)`, [name, price, image, description]
    );
}

async function getCakePriceById(cakeId){
    return db.query(`
        SELECT cakes.price 
        FROM cakes
        WHERE cakes.id = $1`, [cakeId]
    )
}

async function createClient(name, address, phone){
    return db.query(`
        INSERT INTO clients (name, address, phone)
        VALUES($1, $2, $3)`, [name, address, phone]
    );
}

async function getClientById(clientId){
    return db.query(
        `SELECT * FROM clients WHERE clients.id=$1`, [clientId]
    );
}

async function createOrder(clientId, cakeId, quantity, totalPrice){
    return db.query(`
        INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice")
        VALUES ($1,$2,$3, $4)`, [clientId, cakeId, quantity, totalPrice]
    );
}

async function getOrders(date){
    let dateQuery = ""
    if (date) {
        dateQuery = `WHERE date_trunc('day', o."createdAt") = date_trunc('day', TIMESTAMP '${date}')`
    }
    return db.query(`
        SELECT o.id AS "orderId", o."clientId", cl.name as "clientName", cl.address AS "clientAddress", cl.phone AS "clientPhone",
        o."cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
        o.quantity, o.quantity, TO_CHAR(o."createdAt", 'YYYY-MM-DD HH24:MI') AS "createdAt", o."totalPrice"
        FROM orders o
        JOIN clients cl ON o."clientId" = cl.id
        JOIN cakes ca ON o."cakeId" = ca.id
        ${dateQuery}`
    );
}

async function getOrderById(orderId){
    return db.query(`    
        SELECT o.id AS "orderId", o."clientId", cl.name as "clientName", cl.address AS "clientAddress", cl.phone AS "clientPhone",
        o."cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
        o.quantity, TO_CHAR(o."createdAt", 'YYYY-MM-DD HH24:MI') AS "createdAt", o."totalPrice"
        FROM orders o
        JOIN clients cl ON o."clientId" = cl.id
        JOIN cakes ca ON o."cakeId" = ca.id
        WHERE o.id = $1
        `, [orderId]
    )
}

async function getOrdersByClientId(clientId){
    return db.query(`
        SELECT o.id AS "orderId", o.quantity, TO_CHAR(o."createdAt", 'YYYY-MM-DD HH24:MI') AS "createdAt", o."totalPrice", ca.name AS "cakeName"
        FROM orders o
        JOIN cakes ca ON o."cakeId" = ca.id
        WHERE o."clientId" = $1
        `, [clientId]
    )
}

const repository = {
    createCake,
    getCakeByName,
    getCakePriceById,
    createClient,
    getClientById,
    createOrder,
    getOrders,
    getOrderById,
    getOrdersByClientId
}

export default repository;