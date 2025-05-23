<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">Browse by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <button v-for="category in categories" :key="category.slug" @click="goToCategory(category)"
          class="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow w-full">
          <div class="text-2xl mb-2">{{ category.icon }}</div>
          <h3 class="font-semibold">{{ category.name }}</h3>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = [
  { name: 'Smartphones', icon: '📱', slug: 'smartphones' },
  { name: 'Laptops', icon: '💻', slug: 'laptops' },
  { name: 'Tablets', icon: '📱', slug: 'tablets' },
  { name: 'Wearables', icon: '⌚', slug: 'wearables' },
  { name: 'Audio', icon: '🎧', slug: 'audio' },
  { name: 'Cameras', icon: '📷', slug: 'cameras' },
  { name: 'Gaming', icon: '🎮', slug: 'gaming' },
  { name: 'Accessories', icon: '🔌', slug: 'accessories' },
]

const goToCategory = (category) => {
  router.push({
    path: '/categories',
    query: { selected: category.slug }
  })
}
</script>