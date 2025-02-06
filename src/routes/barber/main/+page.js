import { json } from '@sveltejs/kit';

export async function load({ fetch }) {
    const responseBarberName = await fetch('/main/barber/name');
    const barberData = await responseBarberName.json();

    const responseBarberAppointment = await fetch('/main/barber/appointment/getAppointment');
    const appointmentData = await responseBarberAppointment.json();

    if (responseBarberName.ok && responseBarberAppointment.ok) {
        return {
            barberData,
            appointmentData
        };
    } else {
        return {
            status: responseBarberName.status,
            error: new Error('Failed to fetch user data')
        };
    }
}