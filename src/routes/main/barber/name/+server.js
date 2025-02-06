import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';

export async function GET({ locals }) {
    const user = locals.user;
    const barber_id = user.barber_id;
    try {
        console.log("Fetching customer data for:", barber_id);
        const [result] = await pool.execute(
            'SELECT * FROM barber WHERE barber_id = ?',
            [barber_id]
        );
        return json(result[0]);
    } catch (error) {
        return json({ message: 'Failed' }, { status: 500 });
    }
}