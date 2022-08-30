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
            const conn = await Client.connect();
            const sql = 'SELECT password, id FROM users WHERE email=($1)';
            const result = await conn.query(sql, [email]);
            if (result.rows.length > 0) {
                console.log("inside result.rows");
                let user = result.rows[0];
                const isValid = bcrypt.compareSync(password, user.password);
                if (isValid) {
                    console.log("inside isValid");
                    const userId = user.id;
                    const token = signToken(userId);
                    user = await conn.query("SELECT * FROM users where id=($1)", [userId]);
                    conn.release();
                    return { user: user.rows[0], token };
                }
            }
            conn.release();
            return null
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