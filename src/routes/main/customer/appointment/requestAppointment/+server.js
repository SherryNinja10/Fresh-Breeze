import { json } from '@sveltejs/kit';
import { pool } from '$lib/index';

export async function POST({ locals, request }) {
    const customer_id = locals.user.customer_id;
    const decision = 'pending';
    const viewed = 0;
    const { appointmentDetails, date, time, barber } = await request.json();
    console.log(customer_id);
    console.log(appointmentDetails);
    console.log(date);
    console.log(time);
    console.log(barber);

    try {
        const [result] = await pool.execute(
            'INSERT INTO appointment(customer_id, barber_id, details, appointment_date, appointment_time, decision, viewed) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [customer_id, barber, appointmentDetails, date, time, decision, viewed]
        );
    } catch (error) {
        console.log(error);
        return json({ message: 'Failed to requst an appointment'}, { status: 500 });
    }
    return json({ message: "Successfully requested an appointment"}, { status: 201 });
}