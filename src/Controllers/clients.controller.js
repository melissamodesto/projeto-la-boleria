import { stripHtlm } from "string-strip-html";
import db from '../../config/db.js';

export const createClient = async (req, res) => {
    const { name, phone, address } = req.body;
    const client = {
        name: stripHtlm(name).result.trim(),
        phone: stripHtlm(phone).result.trim(),
        address: stripHtlm(address).result.trim()
    };

    try {
        await db.query(`
            INSERT INTO clients (name, phone, address)
            VALUES ($1, $2, $3)
        `, [client.name, client.phone, client.address]);

        return res.sendStatus(201);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export default createClient;