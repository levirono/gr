<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />

    <main class="py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-8 text-green-700 flex items-center gap-2">
          <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
            <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
          Device Reviews
        </h1>

        <!-- Loading State -->
        <div v-if="pending" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading reviews...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600">Error loading reviews. Please try again later.</p>
        </div>

        <!-- Reviews Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="review in (reviews?.data || [])" :key="review.id"
            class="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
            <NuxtLink :to="`/reviews/${review.slug}`" class="block">
              <div class="relative h-48">
                <img v-if="review.featured_image_url" :src="review.featured_image_url" :alt="review.title"
                  class="w-full h-full object-contain bg-gray-100">
                <div v-else class="w-full h-full bg-green-50 flex items-center justify-center">
                  <svg class="w-8 h-8 text-green-400 mr-2" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2"
                      fill="none" />
                    <path d="M8 16l2-2 4 4 4-6" stroke="currentColor" stroke-width="2" fill="none" />
                  </svg>
                  <span class="text-green-500">No image available</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2 text-green-700 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                    <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                  </svg>
                  {{ review.title }}
                </h3>
                <p class="text-gray-600 line-clamp-3">{{ review.excerpt }}</p>
              </div>
            </NuxtLink>
            <div class="p-6">
              <div class="flex items-center gap-4 mb-4">
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {{ review.category?.name }}
                </span>
                <span class="text-gray-500 text-sm">{{ formatDate(review.created_at) }}</span>
              </div>
              <div class="flex items-center gap-2 mb-4">
                <div class="flex text-yellow-400">
                  <span v-for="n in 5" :key="n" class="text-lg">
                    {{ n <= Math.round(review.rating) ? '\u2605' : '\u2606' }} </span>
                </div>
                <span class="text-gray-600">({{ review.rating }}/5)</span>
              </div>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ review.excerpt }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
interface Review {
  id: string;
  title: string;
  slug: string;
  category: {
    name: string;
  };
  excerpt: string;
  rating: number;
  featured_image_url?: string;
  images?: Array<{
    cloudinary_url: string;
  }>;
  created_at: string;
}

const { data: reviews, pending, error } = await useFetch<{ data: Review[] }>('/api/reviews', {
  transform: (response) => {
    if (!response?.data) return { data: [] }
    return { data: response.data }
  }
})

// Format date to relative time
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