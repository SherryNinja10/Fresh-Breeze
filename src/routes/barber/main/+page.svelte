<script>
    import { goto } from "$app/navigation";
    import swal from "sweetalert2";
    import { fade, fly, slide, scale } from 'svelte/transition';

    const { data } = $props();
    
    console.log("Data here:");
    console.log(data);

    let activeButton = $state("request"); // Default active button
    let first_name = data.barberData.first_name;
    let appointments = data.appointmentData;

    console.log("Barber details:");
    console.log(data.barberData);

    console.log("Appointments here:");
    console.log(appointments);

    const logout = async (event) => {
        event.preventDefault();
        console.log("Logging out...");
        try {
            const response = await fetch("/auth/barber/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                swal.fire({
                    title: "Successfully logged out",
                    icon: "success",
                    confirmButtonText: "Continue",
                });
                goto("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const formatDateTime = (dateString, timeString) => {
    // Parse the date string into a Date object (UTC)
    const date = new Date(dateString);

    // Format the date in Pacific Time
    const formattedDate = date.toLocaleDateString('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Return the formatted date with the original time
    return `${formattedDate} at ${timeString}`;
};

    const approveAppointment = async (appointmentId) => {
        console.log("Approving appointment...");
        console.log(appointmentId);
        try {
            const response = await fetch(`/main/barber/appointment/approveAppointment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ appointmentId }),
            });
            if (response.ok) {
                swal.fire({
                    title: "Appointment approved",
                    icon: "success",
                    confirmButtonText: "Continue",
                });
                // Refresh the page
                location.reload();
            } else {
                console.error("Approval failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const rejectAppointment = async (appointmentId) => {
        console.log("Rejecting appointment...");
        console.log(appointmentId);
        try {
            const response = await fetch(`/main/barber/appointment/rejectAppointment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ appointmentId }),
            });
            if (response.ok) {
                swal.fire({
                    title: "Appointment rejected",
                    icon: "success",
                    confirmButtonText: "Continue",
                });
                // Refresh the page
                location.reload();
            } else {
                console.error("Rejection failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

</script>

<main class="flex flex-col items-center min-h-screen text-center bg-gray-100 text-gray-800 p-8 font-sans">
    <h1 class="text-4xl font-bold mb-4">Welcome, {first_name}!</h1>
    
    <div class="flex flex-row items-center space-x-4 mb-4">
        <button
            class={`py-2 px-4 rounded-full transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                activeButton === "request"
                    ? "bg-orange-700 text-white ring-orange-500"
                    : "bg-orange-500 hover:bg-orange-700 text-white ring-orange-500"
            }`}
            onclick={() => (activeButton = "request")}
        >
            requests
        </button>
        <button
            class={`py-2 px-4 rounded-full transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                activeButton === "appointments"
                    ? "bg-orange-700 text-white ring-orange-500"
                    : "bg-orange-500 hover:bg-orange-700 text-white ring-orange-500"
            }`}
            onclick={() => (activeButton = "appointments")}
        >
            Appointments
        </button>
        <button onclick={logout} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Logout</button>
    </div>

    {#if activeButton === "request"}
        <div>
            {#if appointments.filter(appointment => appointment.decision === 'pending').length === 0}
                <p>No requests at the moment</p>
            {:else}
                <div class="grid grid-cols-1 gap-4">
                    {#each appointments.filter(appointment => appointment.decision === 'pending') as appointment}
                        <div class="bg-white shadow-md rounded-lg p-4">
                            <h2 class="text-xl font-semibold mb-2">{appointment.customer_first_name} {appointment.customer_last_name}</h2>
                            <p class="text-gray-600">Date and time: {formatDateTime(appointment.appointment_date, appointment.appointment_time)}</p>
                            <p class="text-gray-600">Details: {appointment.details}</p>
                            <div class="flex justify-center space-x-2 mt-4">
                                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onclick={() => approveAppointment(appointment.appointment_id)}>Approve</button>
                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onclick={() => rejectAppointment(appointment.appointment_id)}>Reject</button>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>

    {:else if activeButton === "appointments"}
        <div>
            {#if appointments.filter(appointment => appointment.decision === 'approved').length === 0}
                <p>Looks like you don't have any customer at the moment</p>
            {:else}
            <div class="grid grid-cols-1 gap-4">
                {#each appointments.filter(appointment => appointment.decision === 'approved') as appointment}
                    <div class="bg-white shadow-md rounded-lg p-4">
                        <h2 class="text-xl font-semibold mb-2">{appointment.customer_first_name} {appointment.customer_last_name}</h2>
                        <p class="text-gray-600">Date and time: {formatDateTime(appointment.appointment_date, appointment.appointment_time)}</p>
                        <p class="text-gray-600">Details: {appointment.details}</p>
                    </div>
                {/each}
            </div>
            {/if}
        </div>
    {/if}
</main>