import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';

export async function POST({ request }) {
    const { appointmentId } = await request.json();
    const viewed = '1';
    try {
        await pool.execute(
            'UPDATE appointment SET viewed = ? WHERE appointment_id = ?;',
            [viewed, appointmentId]
        );
        return json({ message: 'Success' });
    } catch (error) {
        return json({ message: 'Failed' }, { status: 500 });
    }
}