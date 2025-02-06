import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST({ request }) {
    const { email, password } = await request.json();

    try {
        const [result] = await pool.execute(
            'SELECT * FROM customer WHERE email = ?',
            [email]
        );

        try {
            const user = result[0];
            const match = await bcrypt.compare(password, user.passcode);

            if (match) {
                const token = jwt.sign(({ customer_id: user.customer_id }), process.env.SECRET_KEY, { expiresIn: '1h' });
                return json(
                    { message: 'Success' },
                    { status: 201,
                        headers: {
                            'Set-Cookie': `customerjwt=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
                        }
                     });
            }
            else {
                return json({ message: 'Invalid email or password' }, { status: 500 });
            }
        } catch (error) {
            return json({ message: 'Invalid email or password' }, { status: 500 });
        }
    }
    catch (error) {
        return json({ message: 'Failed' }, { status: 500 });
    }
}