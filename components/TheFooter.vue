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
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/reviews" class="text-gray-400 hover:text-white">Reviews</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categories" class="text-gray-400 hover:text-white">Categories</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-gray-400 hover:text-white">About</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-gray-400 hover:text-white">Blog</NuxtLink>
            </li>


          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Categories</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink :to="{ path: '/categories', query: { selected: 'smartphones' } }"
                :class="categoryLinkClass('smartphones')">Smartphones</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="{ path: '/categories', query: { selected: 'laptops' } }"
                :class="categoryLinkClass('laptops')">Laptops</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="{ path: '/categories', query: { selected: 'tablets' } }"
                :class="categoryLinkClass('tablets')">Tablets</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="{ path: '/categories', query: { selected: 'wearables' } }"
                :class="categoryLinkClass('wearables')">Wearables</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Contact</h4>
          <ul class="space-y-2">
            <li>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=genixlsolutions@gmail.com.com" target="_blank"
                rel="noopener" class="flex items-center gap-2 text-gray-400 hover:text-white underline"
                aria-label="Send email">
                <span class="text-2xl">📧</span>
                Email
              </a>
            </li>
            <li class="text-gray-400">Follow us on social media</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 DeviceReview. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
function categoryLinkClass(slug) {
  return [
    'text-gray-400 hover:text-white',
    route.path === '/categories' && route.query.selected === slug ? 'font-bold text-white underline' : ''
  ].join(' ')
}
</script>