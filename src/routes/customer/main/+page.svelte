<script>
    import { goto } from "$app/navigation";
    import swal from "sweetalert2";
    import { fade, fly, slide, scale } from "svelte/transition";

    const { data } = $props();

    console.log("Data here:");
    console.log(data);

    let showModal = $state(false);
    let activeButton = $state("pending"); // Default active button
    let first_name = data.customerData.first_name;
    let appointments = data.appointmentData;
    let barbers = data.allBarbers;
    let rejectedAppointments = appointments.filter(
  (appointment) => appointment.decision === "rejected" && appointment.viewed === 0
);


    let newAppointmentData = $state({
        appointmentDetails: "",
        date: "",
        time: "",
        barber: ""
    });

    console.log("Customer details:");
    console.log(data.customerData);

    console.log("Appointments here:");
    console.log(appointments);

    console.log("All barbers registered in the system:");
    console.log(barbers);

    const logout = async (event) => {
        event.preventDefault();
        console.log("Logging out...");
        try {
            const response = await fetch("/auth/customer/logout", {
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
        const formattedDate = date.toLocaleDateString("en-US", {
            timeZone: "America/Los_Angeles",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        // Return the formatted date with the original time
        return `${formattedDate} at ${timeString}`;
    };

    const closingModel = async () => {
        showModal = false;
        newAppointmentData.appointmentDetails = "";
        newAppointmentData.date = "";
        newAppointmentData.time = "";
        newAppointmentData.barber = "";
    };

    const handleRequest = async (event) => {
        event.preventDefault;

        console.log(newAppointmentData);

        try {
            const response = await fetch('/main/customer/appointment/requestAppointment', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newAppointmentData)
            });

            if (response.ok) {
                swal.fire({
                    title: 'Registration Successful',
                    text: 'You have successfully registered for a new account',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                });
            } else {
                // Error alert
                swal.fire({
                    title: 'Error!',
                    text: 'User registration failed. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        } catch (error) {
            // Alert for unexpected errors
            swal.fire({
                title: 'Oops!',
                text: 'Something went wrong. Please check your connection and try again.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
        }
    };

    const viewRejectedAppointments = async (appointmentId, appointmentDate, appointmentTime, appointmentBarberFirstName, appointmentBarberLastName) => {
        console.log("Viewing rejected appointments...");

        swal.fire({
                    title: "Rejected appointment",
                    html: `<p>Date: ${appointmentDate}</p>
                           <p>Time: ${appointmentTime}</p>
                           <p>Barber: ${appointmentBarberFirstName} ${appointmentBarberLastName}</p>`,
                    icon: "success",
                    confirmButtonText: "Continue",
                });

        try {
            const response = await fetch(`/main/customer/appointment/viewRejectedAppointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ appointmentId }),
            });
            if (response.ok) {
                location.reload();
            } else {
                console.error("Viewing rejected appointments failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (rejectedAppointments.length > 0) {
        rejectedAppointments.forEach(element => {
            viewRejectedAppointments(element.appointment_id, element.appointment_date, element.appointment_time, element.barber_first_name, element.barber_last_name);
        });
    }
</script>

<main
    class="flex flex-col items-center min-h-screen text-center bg-gray-100 text-gray-800 p-8 font-sans"
>
    <h1 class="text-4xl font-bold mb-4">Welcome, {first_name}!</h1>

    <div class="flex flex-row items-center space-x-4 mb-4">
        <button
            class={`py-2 px-4 rounded-full transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                activeButton === "pending"
                    ? "bg-orange-700 text-white ring-orange-500"
                    : "bg-orange-500 hover:bg-orange-700 text-white ring-orange-500"
            }`}
            onclick={() => (activeButton = "pending")}
        >
            Pending
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
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onclick={() => (showModal = true)}>+ Appointment</button
        >
        <button
            onclick={logout}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >Logout</button
        >
    </div>

    {#if activeButton === "pending"}
        <div>
            {#if appointments.filter((appointment) => appointment.decision === "pending").length === 0}
                <p>No pending requests</p>
            {:else}
                <div class="grid grid-cols-1 gap-4">
                    {#each appointments.filter((appointment) => appointment.decision === "pending") as appointment}
                        <div class="bg-white shadow-md rounded-lg p-4">
                            <h2 class="text-xl font-semibold mb-2">
                                {appointment.barber_first_name}
                                {appointment.barber_last_name}
                            </h2>
                            <p class="text-gray-600">
                                Date and time: {formatDateTime(
                                    appointment.appointment_date,
                                    appointment.appointment_time,
                                )}
                            </p>
                            <p class="text-gray-600">
                                Details: {appointment.details}
                            </p>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {:else if activeButton === "appointments"}
        <div>
            {#if appointments.filter((appointment) => appointment.decision === "approved").length === 0}
                <p>Looks like you haven't booked any appointments</p>
            {:else}
                <div class="grid grid-cols-1 gap-4">
                    {#each appointments.filter((appointment) => appointment.decision === "approved") as appointment}
                        <div class="bg-white shadow-md rounded-lg p-4">
                            <h2 class="text-xl font-semibold mb-2">
                                {appointment.barber_first_name}
                                {appointment.barber_last_name}
                            </h2>
                            <p class="text-gray-600">
                                Date and time: {formatDateTime(
                                    appointment.appointment_date,
                                    appointment.appointment_time,
                                )}
                            </p>
                            <p class="text-gray-600">
                                Details: {appointment.details}
                            </p>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}

    <!-- Modal -->
    {#if showModal}
        <div
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            transition:scale
        >
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 class="text-xl font-semibold mb-4">Book an Appointment</h2>

                <!-- Form -->
                <form onsubmit={handleRequest}>
                    <label for="name" class="block text-sm font-medium"
                        >details</label
                    >
                    <input
                        type="text"
                        id="name"
                        class="w-full border p-2 rounded-md mb-3"
                        bind:value={newAppointmentData.appointmentDetails}
                    />

                    <label for="date" class="block text-sm font-medium"
                        >Date</label
                    >
                    <input
                        type="date"
                        id="date"
                        class="w-full border p-2 rounded-md mb-3"
                        bind:value={newAppointmentData.date}
                    />

                    <label for="time" class="block text-sm font-medium"
                        >Time</label
                    >
                    <input
                        type="time"
                        id="time"
                        class="w-full border p-2 rounded-md mb-3"
                        bind:value={newAppointmentData.time}
                    />

                    <!-- Dropdown for selecting a barber -->
                    <label for="barber" class="block text-sm font-medium"
                        >Select Barber</label
                    >
                    <select
                        id="barber"
                        class="w-full border p-2 rounded-md mb-3"
                        bind:value={newAppointmentData.barber}
                    >
                        {#each barbers as barber}
                            <option value={barber.barber_id}
                                >{barber.first_name} {barber.last_name}</option
                            >
                        {/each}
                    </select>

                    <div class="flex justify-end space-x-2">
                        <button
                            type="button"
                            class="px-4 py-2 text-gray-600"
                            onclick={closingModel}>Cancel</button
                        >
                        <button
                            type="submit"
                            class="px-4 py-2 bg-green-500 text-white rounded-md"
                            >Confirm</button
                        >
                    </div>
                </form>
            </div>
        </div>
    {/if}
</main>
