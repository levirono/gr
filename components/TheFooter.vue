<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">DeviceReview</h3>
          <p class="text-gray-400">
            Your trusted source for device reviews and comparisons
          </p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-gray-400 hover:text-white">Home</NuxtLink></li>
            <li><NuxtLink to="/reviews" class="text-gray-400 hover:text-white">Reviews</NuxtLink></li>
            <li><NuxtLink to="/categories" class="text-gray-400 hover:text-white">Categories</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-gray-400 hover:text-white">About</NuxtLink></li>
            <li><NuxtLink to="/blog" class="text-gray-400 hover:text-white">Blog</NuxtLink></li>


          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Categories</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/category/smartphones" class="text-gray-400 hover:text-white">Smartphones</NuxtLink></li>
            <li><NuxtLink to="/category/laptops" class="text-gray-400 hover:text-white">Laptops</NuxtLink></li>
            <li><NuxtLink to="/category/tablets" class="text-gray-400 hover:text-white">Tablets</NuxtLink></li>
            <li><NuxtLink to="/category/wearables" class="text-gray-400 hover:text-white">Wearables</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Contact</h4>
          <ul class="space-y-2">
            <li class="text-gray-400">Email: contact@devicereview.com</li>
            <li class="text-gray-400">Follow us on social media</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 DeviceReview. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template> 