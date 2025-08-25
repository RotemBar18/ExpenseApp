// utils/db.js — PostgreSQL only
const { Pool } = require('pg');

// Convert "?" placeholders to $1,$2,... so your existing SQL keeps working
function toPgParams(sql) {
    let i = 0;
    return sql.replace(/\?/g, () => `$${++i}`);
}

const pool = new Pool({
    host: process.env.PGHOST || '127.0.0.1',
    port: Number(process.env.PGPORT || 5432),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'expenseapp_pg',
    max: 5,
    idleTimeoutMillis: 30000,
    ...(process.env.PGSSL === 'true' ? { ssl: { rejectUnauthorized: false } } : {})
});

// Expose a mysql2-like interface: query() returns [rows]
module.exports = {
    query: async (sql, params = []) => {
        const text = toPgParams(sql);
        const res = await pool.query(text, params);
        return [res.rows];
    },
    _raw: pool
};
