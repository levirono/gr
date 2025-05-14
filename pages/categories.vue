<template>
    <div class="min-h-screen">
      <TheHeader />
      <main>
        <!-- Hero Section -->
        <section class="bg-gray-50 py-12">
          <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold mb-4">Device Categories</h1>
            <p class="text-gray-600">Browse reviews by device category</p>
          </div>
        </section>
  
        <!-- Categories Grid -->
        <section class="py-16">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="category in categories" :key="category.id" 
                   class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div class="text-4xl mb-4">{{ category.icon }}</div>
                <h2 class="text-2xl font-semibold mb-2">{{ category.name }}</h2>
                <p class="text-gray-600 mb-4">{{ category.description }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">{{ category.reviews?.length || 0 }} reviews</span>
                  <NuxtLink :to="`/category/${category.slug}`" class="text-blue-600 hover:underline">
                    View All →
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Featured Category -->
        <section class="py-16 bg-gray-50">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-8">Featured Category: Smartphones</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow-md p-6">
                <div class="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                <h3 class="font-semibold mb-2">Latest Smartphone Review</h3>
                <p class="text-gray-600 mb-4">Check out our detailed analysis...</p>
                <NuxtLink to="/" class="text-blue-600 hover:underline">Read More →</NuxtLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <TheFooter />
    </div>
  </template>
  
  <script setup>
  const { data: categories } = await useFetch('/api/categories')
  </script>