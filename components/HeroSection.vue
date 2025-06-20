<template>
  <section class="bg-gradient-to-r from-gray-50 via-gray-200 to-gray-400 text-white py-20">
    <div class="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
      <div class="max-w-3xl">
        <h1
          class="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Find Your Perfect Device
        </h1>
        <p class="text-xl mb-8 bg-gradient-to-r from-blue-700 via-green-600 to-blue-900 bg-clip-text text-transparent">
          Expert reviews and comparisons to help you make the right choice
        </p>
        <div class="flex items-center mb-8 bg-white bg-opacity-20 rounded-lg shadow-lg p-2 backdrop-blur-md">
          <input type="text" placeholder="Search for devices, brands, or reviews..."
            class="flex-1 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none bg-transparent placeholder-gray-400" />
          <button
            class="px-6 py-2 rounded-r-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold hover:from-green-400 hover:to-blue-500 transition-all duration-200">
            Search
          </button>
        </div>
        <!-- <button class="btn btn-primary bg-white text-blue-600 hover:bg-gray-100 shadow-md"
          @click="$emit('browseReviews')">
          Browse Reviews
        </button> -->
      </div>
      <!-- Right-side info box for large screens -->
      <div class="hidden lg:flex flex-col items-center justify-center ml-12 bg-white bg-opacity-30 rounded-2xl shadow-xl p-8 max-w-sm">
        <svg class="w-16 h-16 mb-4 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="url(#grad1)" stroke-width="2" fill="none" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 7v5l3 3" stroke="url(#grad1)" stroke-width="2" />
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stop-color="#22d3ee" />
              <stop offset="1" stop-color="#22c55e" />
            </linearGradient>
          </defs>
        </svg>
        <h2 class="text-2xl font-bold mb-2 text-green-700">Welcome to DeviceReviews</h2>
        <p class="text-gray-700 text-center mb-2">Your trusted source for in-depth, unbiased reviews and comparisons of the latest devices. Discover, compare, and choose with confidence!</p>
        <span class="text-xs text-gray-500">Expert opinions. Real insights.</span>
      </div>
    </div>
  </section>
</template>

<!-- Add any additional styles if needed -->
<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

.text-transparent {
  color: transparent;
}
</style>