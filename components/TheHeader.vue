<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
          DeviceReviews
        </NuxtLink>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-600 hover:text-blue-600">Home</NuxtLink>
          <NuxtLink to="/reviews" class="text-gray-600 hover:text-blue-600">Reviews</NuxtLink>
          <NuxtLink to="/categories" class="text-gray-600 hover:text-blue-600">Categories</NuxtLink>
          <NuxtLink to="/blog" class="text-gray-600 hover:text-blue-600">Blog</NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-gray-600 hover:text-blue-600"
        >
          <svg 
            v-if="!isMenuOpen" 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg 
            v-else 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="isMenuOpen" 
        class="md:hidden mt-4 space-y-4"
      >
        <NuxtLink 
          to="/" 
          class="block text-gray-600 hover:text-blue-600"
          @click="isMenuOpen = false"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/reviews" 
          class="block text-gray-600 hover:text-blue-600"
          @click="isMenuOpen = false"
        >
          Reviews
        </NuxtLink>
        <NuxtLink 
          to="/categories" 
          class="block text-gray-600 hover:text-blue-600"
          @click="isMenuOpen = false"
        >
          Categories
        </NuxtLink>
        <NuxtLink 
          to="/blog" 
          class="block text-gray-600 hover:text-blue-600"
          @click="isMenuOpen = false"
        >
          Blog
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false)
</script>