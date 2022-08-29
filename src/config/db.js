const { Pool } = require("pg")
const dotenv = require('dotenv');
dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, POSTGRES_TEST_DB } = process.env;

let Client = new Pool({
    host: "localhost",
    user: "daf_user",
    password: "password123",
    database: "daf"
});
// if (ENV === 'dev') {
//     Client = new Pool({
//         host: "localhost",
//         user: "daf_user",
//         password: "password123",
//         database: "DAF"
//     })
// } else if (ENV === 'test') {
//     Client = new Pool({
//         host: "localhost",
//         user: "daf_user",
//         password: "password123",
//         database: "DAF_test"
//     })
// }

module.exports = Client;