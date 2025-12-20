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

// Get all wardens (ordered by staff number ignoring W)

export async function getAllWardens() {
    const pool = await getPool();

    return pool.request().query(`
        SELECT user_id, staff_number, first_name, last_name, email
        FROM dbo.Users
        WHERE role = 'warden'
        ORDER BY CAST(SUBSTRING(staff_number, 2, LEN(staff_number)) AS INT);
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

// locations without cover

export async function getLocationsWithoutCover() {
    const pool = await getPool();

    return pool.request().query(`
        SELECT l.location_id, l.location_name
        FROM dbo.Locations l
        LEFT JOIN dbo.WardenStatus ws
        ON ws.location_id = l.location_id
        LEFT JOIN dbo.Users u
        ON u.user_id = ws.user_id
        AND u.role = 'warden'
        WHERE u.user_id IS NULL AND l.location_id <> 1
        ORDER BY l.location_name;
    `);
}

// Get all users

export async function getAllUsers() {
    const pool = await getPool();

    return pool.request().query(`
        SELECT user_id, staff_number, first_name, last_name, email, role
        FROM dbo.Users
        ORDER BY role, last_name, first_name
    `);
}

// Create new user entry

export async function createNewUser({ staffNumber, firstName, lastName, email, role, passwordHash }) {
    const pool = await getPool();

    const insertUser = await pool.request()
        .input("staff_number", staffNumber)
        .input("first_name", firstName)
        .input("last_name", lastName)
        .input("email", email)
        .input("role", role)
        .input("password_hash", passwordHash)
        .query(`
            INSERT INTO dbo.Users (staff_number, first_name, last_name, email, role, password_hash)
            OUTPUT INSERTED.user_id
            VALUES (@staff_number, @first_name, @last_name, @email, @role, @password_hash)
        `);
    const newUserId = insertUser.recordset[0].user_id;

    if (role === 'warden') {
        await pool.request()
            .input("user_id", newUserId)
            .query(`
                INSERT INTO dbo.WardenStatus (user_id, location_id, started_at)
                VALUES (@user_id, 1, SYSDATETIME())
            `);
    }

    return newUserId;
}

// Update User

export async function updateUser(userId, { staffNumber, firstName, lastName, email, role }){
    const pool = await getPool();

    const oldData = await pool.request()
        .input("user_id", userId)
        .query(`
            SELECT role FROM dbo.Users WHERE user_id = @user_id
        `);

    // to protect against error with two admins on two screens and the async function NOT updating
    // once a user has been deleted on one screen but NOT showing on the other
    if (oldData.recordset.length === 0 ) {
        throw new Error("User not found")
    }

    await pool.request()
        .input("user_id", userId)
        .input("staff_number", staffNumber)
        .input("first_name", firstName)
        .input("last_name", lastName)
        .input("email", email)
        .query(`
            UPDATE dbo.Users
            SET staff_number = @staff_number,
                first_name = @first_name,
                last_name = @last_name,
                email = @email,
            WHERE user_id = @user_id
        `);

}

// Delete user safely

export async function deleteUserSafely(userId) {
    const pool = await getPool();

    // deleting wardenstatus first to remove link with foreign key
    await pool.request()
        .input("user_id", userId)
        .query(`
            DELETE FROM dbo.WardenStatus WHERE user_id = @user_id
        `);
    
    // delete from user table
    await pool.request()
        .input("user_id", userId)
        .query(`
            DELETE FROM dbo.Users WHERE user_id = @user_id
        `);
}