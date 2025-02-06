import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';

export async function GET({ locals }) {
    const customer_id = locals.user.customer_id;
    console.log("Fetching appointment data for: ", customer_id);

    try {
        console.log("Fetching appointment data for: ", customer_id);
        const [result] = await pool.execute(
            'SELECT a.*, b.first_name AS barber_first_name, b.last_name AS barber_last_name FROM appointment a JOIN barber b ON a.barber_id = b.barber_id WHERE a.customer_id = ?;',
            [customer_id]
        );
        return json(result);
    } catch (error) {
        return json({ message: 'Failed' }, { status: 500 });
    }
}