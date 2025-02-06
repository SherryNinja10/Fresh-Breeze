import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';

export async function GET({ locals }) {
    const barber_id = locals.user.barber_id;
    console.log("Fetching appointment data for: ", barber_id);

    try {
        console.log("Fetching appointment data for: ", barber_id);
        const [result] = await pool.execute(
            'SELECT a.*, c.first_name AS customer_first_name, c.last_name AS customer_last_name FROM appointment a JOIN customer c ON a.customer_id = c.customer_id WHERE a.barber_id = ?;',
            [barber_id]
        );
        return json(result);
    } catch (error) {
        return json({ message: 'Failed' }, { status: 500 });
    }
}