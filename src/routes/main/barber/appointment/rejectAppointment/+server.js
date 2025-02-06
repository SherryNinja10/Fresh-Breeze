import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';

export async function POST({ request }) {
    const { appointmentId } = await request.json();
    const decision = 'rejected';
    try {
        await pool.execute(
            'UPDATE appointment SET decision = ? WHERE appointment_id = ?;',
            [decision, appointmentId]
        );
        return json({ message: 'Success' });
    } catch (error) {
        return json({ message: 'Failed' }, { status: 500 });
    }
}