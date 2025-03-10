import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
    const { firstName, lastName, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    if (firstName === undefined || lastName === undefined || email === undefined || password === undefined) {
        return json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const [result] = await pool.execute(
            'INSERT INTO customer (first_name, last_name, email, passcode) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword]
        );
    }
    catch (error) {
        console.error("SQL Error:", error);  // Log the error
        return json({ message: 'Failed' }, { status: 500 });
    }

    return json({ message: 'Success' }, { status: 201 });
}