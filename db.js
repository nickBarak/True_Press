import { Pool } from 'pg';
if (process.NODE_ENV !== 'production') import('dotenv').then(({ config }) => config());


if (!pool) {
    var pool = new Pool({
        max: 200,
        connectionString: process.env.DATABASE_URL,
        idleTimeoutMillis: 0
    });
    /* Reports DB connection status */
    (async _=>{
        try {
            var client = await pool.connect();
            client
                ? console.log('Connected to PostgreSQL')
                : console.log('Failed to connect to database');
        } catch (e) { console.log(e) }
        finally { client && client.release() }
    })();
}

/* Convenience for simple DB transactions */
export async function queryDB(query, params=[]) {
    try {
        var client = await pool.connect(),
            { rows } = await client.query(query, params);
    } catch (e) { console.log(e) }
    finally { client && client.release() }
    return rows;
}

export async function insertUser(name, email) {
    await queryDB('INSERT INTO users (name, email, comments, following) VALUES ($1, $2, $3, $4)', [name, email, [], []]);
}

export async function getUser(email) {
   let [user] = await queryDB('SELECT * FROM users WHERE email = $1', [email]);
    return user;
}