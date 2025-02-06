import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';

export async function GET({ locals }) {
    const user = locals.user;
    const customer_id = user.customer_id;
    try {
        console.log("Fetching customer data for:", customer_id);
        const [result] = await pool.execute(
            'SELECT * FROM customer WHERE customer_id = ?',
            [customer_id]
        );
        return json(result[0]);
    } catch (error) {
        return json({ message: 'Failed' }, { status: 500 });
    }
}