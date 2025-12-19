import { getPool } from "./db";

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

// Get all warden current whereabouts

export async function getAllWardenWhereabouts() {
    const pool = await getPool();

    return pool.request().query(`
        SELECT u.first_name, u.last_name, l.location_name, ws.started_at
        FROM dbo.WardenStatus ws
        INNER JOIN dbo.Users u ON u.user_id = ws.user_id
        INNER JOIN dbo.Locations l ON l.location_id = ws.location_id
        WHERE u.role = 'warden'
    `);
}

// Update warden location in database

export async function updateWardenLocation(userId, locationId) {
    const pool = await getPool();

    return pool.request()
        .input("user_id", userId)
        .input("location_id", locationId)
        .query(`
            UPDATE dbo.WardenStatus
            SET location_id = @location_id, started_at = SYSDATETIME()
            WHERE user_id = @user_id
        `);
}

// get THIS warden current whereabouts

export async function getThisWardensWhereabouts(userId) {
    const pool = await getPool();

    return pool.request()
        .input("user_id", userId)
        .query(`
            SELECT u.first_name, u.last_name, l.location_name, ws.started_at
            FROM dbo.Users u
            INNER JOIN dbo.WardenStatus ws ON ws.user_id = u.user_id
            INNER JOIN dbo.Locations l ON l.location_id = ws.location_id
            WHERE u.user_id = @user_id
        `);
}