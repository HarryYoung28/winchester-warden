import sql from "mssql";

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

let globalPool = global._mssqlPool;

export async function getPool() {
    if (globalPool) return globalPool;

    const pool = await sql.connect(config);
    globalPool = pool;
    global._mssqlPool = pool;
    return pool;
}

export { sql };