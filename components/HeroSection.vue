<template>
  <section class="bg-gradient-to-r from-gray-50 via-gray-200 to-gray-400 text-white py-20">
    <div class="container mx-auto px-4">
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