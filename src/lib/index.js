import { dot } from 'node:test/reporters';

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    connectionLimit: 10,
    reconnect: true,
    waitForConnections: true,
    queueLimit: 0
});

pool.on('error', (err) => {
    console.error('MySQL Pool Error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Attempting to reconnect...');
        pool.connect();
    }
});

export { pool };