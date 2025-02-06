import { dot } from 'node:test/reporters';

// place files you want to import through the `$lib` alias in this folder.
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'freshbreeze',
    password: process.env.PASSWORD,
    port: '3306',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});