import { json } from '@sveltejs/kit';

export async function load({ fetch }) {
    const responseCustomerName = await fetch('/main/customer/name');
    const customerData = await responseCustomerName.json();

    const responseCustomerAppointment = await fetch('/main/customer/appointment/getAppointment');
    const appointmentData = await responseCustomerAppointment.json();

    const responseBarbers = await fetch('/main/customer/allBarbers');
    const allBarbers = await responseBarbers.json();

    if (responseCustomerName.ok && responseCustomerAppointment.ok) {
        return {
            customerData,
            appointmentData,
            allBarbers
        };
    } else {
        return {
            status: responseCustomerName.status,
            error: new Error('Failed to fetch user data')
        };
    }
}