<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />

    <main class="py-8">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="pending" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading reviews...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600">Error loading reviews. Please try again later.</p>
        </div>

        <!-- Category Content -->
        <div v-else class="max-w-7xl mx-auto">
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-bold text-green-700 flex items-center gap-2">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              {{ category?.data?.name }} Reviews
            </h1>
            <!-- Filters -->
            <div class="flex gap-4">
              <select v-model="sortBy"
                class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 border-green-300">
                <option value="latest">Latest First</option>
                <option value="rating">Highest Rated</option>
                <option value="oldest">Oldest First</option>
              </select>
              <select v-model="ratingFilter"
                class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 border-green-300">
                <option value="0">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>
          </div>

          <!-- Reviews Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="review in filteredReviews" :key="review.id"
              class="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
              <div class="relative h-48">
                <img v-if="review.images?.[0]?.cloudinary_url" :src="review.images[0].cloudinary_url"
                  :alt="review.title" class="w-full h-full object-cover">
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
                <div class="flex items-center gap-4 mb-4">
                  <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {{ review.category?.name }}
                  </span>
                  <span class="text-gray-500 text-sm">{{ formatDate(review.created_at) }}</span>
                </div>
                <h2 class="text-xl font-bold mb-2 text-green-700 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                    <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                  </svg>
                  {{ review.title }}
                </h2>
                <div class="flex items-center gap-2 mb-4">
                  <div class="flex text-yellow-400">
                    <span v-for="n in 5" :key="n" class="text-lg">
                      {{ n <= Math.round(review.rating) ? '\u2605' : '\u2606' }} </span>
                  </div>
                  <span class="text-gray-600">({{ review.rating }}/5)</span>
                </div>
                <p class="text-gray-600 mb-4 line-clamp-3">{{ review.excerpt }}</p>
                <NuxtLink :to="`/reviews/${review.slug}`"
                  class="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Read Full Review
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div v-if="filteredReviews.length === 0" class="text-center py-12">
            <p class="text-gray-600">No reviews found matching your criteria.</p>
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
  images: Array<{
    cloudinary_url: string;
  }>;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const route = useRoute()
const slug = route.params.slug

// State
const sortBy = ref('latest')
const ratingFilter = ref('0')

// Fetch category and reviews
const { data: category, pending: categoryPending } = await useFetch<{ data: Category }>(`/api/categories/${slug}`)
const { data: reviews, pending: reviewsPending, error } = await useFetch<{ data: Review[] }>(`/api/reviews`, {
  query: {
    category: slug
  },
  transform: (response) => {
    if (!response?.data) return { data: [] }
    return { data: response.data }
  }
})

const pending = computed(() => categoryPending.value || reviewsPending.value)

// Computed filtered and sorted reviews
const filteredReviews = computed(() => {
  let result = [...(reviews.value?.data || [])]

  // Apply rating filter
  if (ratingFilter.value !== '0') {
    result = result.filter(review => review.rating >= parseInt(ratingFilter.value))
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'latest':
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
    case 'oldest':
      result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
  }

  return result
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