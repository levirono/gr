<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">Browse by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <NuxtLink 
          v-for="category in categories" 
          :key="category.name"
          :to="category.link"
          class="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
        >
          <div class="text-2xl mb-2">{{ category.icon }}</div>
          <h3 class="font-semibold">{{ category.name }}</h3>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  { name: 'Smartphones', icon: '📱', link: '/category/smartphones' },
  { name: 'Laptops', icon: '💻', link: '/category/laptops' },
  { name: 'Tablets', icon: '📱', link: '/category/tablets' },
  { name: 'Wearables', icon: '⌚', link: '/category/wearables' },
  { name: 'Audio', icon: '🎧', link: '/category/audio' },
  { name: 'Cameras', icon: '��', link: '/category/cameras' },
  { name: 'Gaming', icon: '��', link: '/category/gaming' },
  { name: 'Accessories', icon: '🔌', link: '/category/accessories' },
]
</script> 