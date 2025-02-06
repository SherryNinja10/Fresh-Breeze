import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';

export async function GET() {
    try {
        const [result] = await pool.execute(
            'SELECT barber_id, first_name, last_name FROM barber',
        )
        return json(result);
    } catch (error) {
        return json({ message: 'Failed' }, { status: 500 });
    }
}