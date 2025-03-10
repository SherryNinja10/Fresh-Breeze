import { dot } from 'node:test/reporters';

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});