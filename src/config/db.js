const { Pool } = require("pg")
const dotenv = require('dotenv');
dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV } = process.env;
console.log(`ENV ${ENV}`);

if (ENV === 'test') {
    Client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_TEST_DB
    })
} else {
    Client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB
    })
}



module.exports = Client;