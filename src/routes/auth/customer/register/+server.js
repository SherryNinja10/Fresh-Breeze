import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
    const { firstName, lastName, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [result] = await pool.execute(
            'INSERT INTO customer (first_name, last_name, email, passcode) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword]
        );
    }
    catch (error) {
        return json({ message: 'Failed' }, { status: 500 });
    }

    return json({ message: 'Success' }, { status: 201 });
}