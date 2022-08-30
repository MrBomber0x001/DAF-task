const bcrypt = require('bcrypt');
const Client = require('../config/db.js')
const { signToken } = require("../utils/jwt.js");


module.exports = class Auth {
    async create(u) {
        const { firstname, middlename, lastname, email, phone, password } = u
        const sql = `INSERT INTO users (firstname, middlename, lastname, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        try {
            const conn = await Client.connect();
            const hash = bcrypt.hashSync(password, 10);
            const result = await conn.query(sql, [firstname, middlename, lastname, phone, email, hash]);
            const createdUser = result.rows[0];
            conn.release();
            const userId = createdUser.id
            const token = signToken(userId)
            return { token, createdUser }

        } catch (error) {
            throw new Error(`Unable to register user ${error}`)
        }
    }

    async authenticate(email, password) {
        try {
            const conn = await Client.connect()
            const sql = `SELECT id FROM users where email=($1)`;
            const result = await conn.query(sql, [email]);
            const userId = result.rows[0].id
            const token = signToken(userId);
        } catch (error) {
            throw new Error(error);
        }
    }

    async checkExistance(email) {
        try {
            const conn = await Client.connect();
            const result = await conn.query(`SELECT email FROM users WHERE email=($1)`, [email]);
            if (result.rows.length > 0) {
                return 1
            }
            return 0;
        } catch (error) {
            throw new Error(error);
        }
    }

    async checkValidation(password) {
        try {
            const conn = await Client.connect();

            const result = await conn.query(sql, [email]);
            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) {
                return 0;
            }
            return 1;
        } catch (error) {

        }
    }
}