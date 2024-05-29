const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password: "abricot123",
    host:"localhost",
    port: 5432,
    database: "rc1"
});

module.exports = pool;