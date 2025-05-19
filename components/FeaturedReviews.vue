<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">Featured Reviews</h2>
      
      <div v-if="pending" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading featured reviews...</p>
      </div>

      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-600">Error loading featured reviews. Please try again later.</p>
      </div>

      <div v-else-if="!featuredReviews?.length" class="text-center py-8">
        <p class="text-gray-600">No featured reviews available at the moment.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="review in featuredReviews" :key="review.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <NuxtLink :to="`/reviews/${review.slug}`" class="block">
            <div class="relative h-48">
              <img 
                v-if="review.featured_image_url" 
                :src="review.featured_image_url" 
                :alt="review.title"
                class="w-full h-full object-cover"
              >
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-500">No image available</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ review.title }}</h3>
              <p class="text-gray-600 line-clamp-3">{{ review.excerpt }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: featuredReviews, pending, error } = await useFetch('/api/reviews', {
  query: {
    featured: true,
    limit: 3
  },
  transform: (response) => {
    if (!response?.data) return []
    return response.data
  }
})
</script>