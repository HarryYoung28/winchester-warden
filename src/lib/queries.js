import { pool } from "mssql";
import { getPool, sql } from "./db";

// Login method query

export async function loginUserQuery(staffNumber) {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("staff_number", staffNumber)
        .query(`
            SELECT user_id, staff_number, role, password_hash
            FROM dbo.Users
            WHERE staff_number = @staff_number
        `);
    return result;
}

// Get all wardens

export async function getAllWardens() {
    const pool = await getPool();

    return pool.request().query(`
        SELECT user_id, staff_number, first_name, last_name
        FROM dbo.Users
        WHERE role = 'warden'
    `);
}
