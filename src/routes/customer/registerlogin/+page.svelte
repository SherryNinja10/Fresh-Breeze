<script>
    import swal from 'sweetalert2';
    import { goto } from '$app/navigation';
    import { fade, fly, slide, scale } from 'svelte/transition';

    let login = $state(true);
    
    let registerData = $state({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    let loginData = $state({
        email: "",
        password: ""
    });

    function handleFormState() {
        // Add your login logic here
        console.log("Switch button clicked");
        login = !login;

        registerData = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };

        loginData = {
            email: "",
            password: ""
        };
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/auth/customer/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                swal.fire({
                    title: 'Registration Successful',
                    text: 'You have successfully registered for a new account',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                });

                login = true;
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

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/auth/customer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                swal.fire({
                    title: 'Login Successful',
                    text: 'You have successfully logged in',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                });
                goto('/customer/main');
            } else {
                // Error alert
                swal.fire({
                    title: 'Error!',
                    text: 'User login failed. Please check your credentials and try again.',
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

</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-8 font-sans">
    <h1 class="text-4xl font-bold mb-4">Customer</h1>
    <p class="text-lg mb-8 text-center max-w-md">Fresh Breeze allows customers to easily register for a new account or log in with an existing one, giving them access to a personalized experience for browsing barbers, checking availability, and booking appointments.</p>

    {#if login}
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm" transition:slide>
            <h2 class="text-2xl font-bold mb-4">Login</h2>
            <form class="mt-8 w-full" onsubmit="{handleLoginSubmit}">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required bind:value={loginData.email}>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required bind:value={loginData.password}>
                </div>
                <div class="flex items-center justify-center">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    {:else}
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm" transition:slide>
            <h2 class="text-2xl font-bold mb-4">Register</h2>
            <form class="mt-8 w-full" onsubmit="{handleRegisterSubmit}">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="first-name">
                First Name
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first-name" type="text" placeholder="First Name" required bind:value={registerData.firstName}>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="last-name">
                Last Name
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" placeholder="Last Name" required bind:value={registerData.lastName}>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required bind:value={registerData.email}>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required bind:value={registerData.password}>
            </div>
            <div class="flex items-center justify-center">
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Register
                </button>
            </div>
            </form>
        </div>
    {/if}

    <div class="flex space-x-4">
        {#if login}
        <button onclick={handleFormState} class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">Register</button>
        {:else}
        <button onclick={handleFormState} class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">Login</button>
        {/if}
    </div>
</div>
