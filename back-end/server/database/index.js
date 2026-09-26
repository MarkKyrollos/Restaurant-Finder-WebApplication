const { Pool } = require("pg");

const pool = new Pool({ connectionTimeoutMillis: 5000 });

module.exports = {
    query: (text, params) => pool.query(text, params),
};