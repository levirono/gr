<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">Latest Reviews</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="review in latestReviews" :key="review.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <NuxtLink :to="`/reviews/${review.slug}`" class="block">
            <div class="relative h-48">
              <img v-if="review.featured_image_url" :src="review.featured_image_url" :alt="review.title"
                class="w-full h-full object-contain bg-gray-100">
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-500">No image available</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ review.title }}</h3>
              <p class="text-gray-600 line-clamp-3">{{ review.excerpt }}</p>
            </div>
          </NuxtLink>
          <div class="p-6">
            <div class="flex items-center gap-4 mb-4">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {{ review.category?.name || 'General' }}
              </span>
              <span class="text-gray-500 text-sm">{{ formatDate(review.created_at) }}</span>
            </div>
            <div class="flex items-center gap-2 mb-4">
              <div class="flex text-yellow-400">
                <span v-for="n in 5" :key="n" class="text-lg">
                  {{ n <= Math.round(review.rating || 0) ? '★' : '☆' }} </span>
              </div>
              <span class="text-gray-600">({{ review.rating || 'N/A' }}/5)</span>
            </div>
            <p class="text-gray-600 mb-4 line-clamp-3">{{ review.excerpt }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Review {
  id: string;
  title: string;
  slug: string;
  category?: { name: string };
  excerpt: string;
  rating?: number;
  featured_image_url?: string;
  review_images?: Array<{
    cloudinary_url: string;
  }>;
  created_at: string;
}

const { data: latestReviews } = await useFetch<{ data: Review[] }>('/api/reviews', {
  query: {
    sort: 'latest',
    limit: 4
  },
  transform: (response) => {
    if (!response?.data) return []
    return response.data
  }
})

const formatDate = (date: string) => {
  const now = new Date()
  const reviewDate = new Date(date)
  const diffTime = Math.abs(now.getTime() - reviewDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return reviewDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>