<main class="min-h-screen bg-gray-100 text-gray-800 p-8 font-sans flex flex-col items-center justify-center">
    <div class="relative bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <div class="absolute inset-0 border-4 border-transparent rounded-lg animate-border"></div>
        <img src="/36025-8-haircut-image.png" alt="Fresh Breeze Logo" class="w-32 mx-auto mb-4">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Fresh Breeze</h1>
        <p class="text-lg text-gray-700 mb-4">
            Fresh Breeze is a user-friendly application that bridges customers and barbers, streamlining the process of booking appointments with ease and convenience.
        </p>
        <div class="flex justify-center">
            <a href="/barber/registerlogin" class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mr-4 transform transition-transform duration-300 hover:scale-110">Barber</a>
            <a href="/customer/registerlogin" class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full transform transition-transform duration-300 hover:scale-110">Customer</a>
        </div>
    </div>
</main>

<style>
    @keyframes borderAnimation {
        0%, 100% {
            border-color: transparent;
            border-top-color: orange;
        }
        25% {
            border-color: transparent;
            border-right-color: orange;
        }
        50% {
            border-color: transparent;
            border-bottom-color: orange;
        }
        75% {
            border-color: transparent;
            border-left-color: orange;
        }
    }

    .animate-border {
        animation: borderAnimation 3s linear infinite;
    }
</style>
