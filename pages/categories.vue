<template>
  <div class="min-h-screen">
    <TheHeader />
    <main>
      <!-- Category Selector -->
      <section class="bg-gray-50 py-8">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold mb-4">Device Categories</h1>
          <p class="text-gray-600 mb-6">Browse reviews by device category</p>
          <div class="flex flex-wrap gap-4 mb-4">
            <button v-for="category in categories" :key="category.id" @click="selectCategory(category)" :class="[
              'px-4 py-2 rounded-full border transition',
              selectedCategory?.id === category.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
            ]">
              <span class="mr-2 text-2xl">{{ category.icon }}</span>
              {{ category.name }}
            </button>
          </div>
        </div>
      </section>

      <!-- Reviews Grid -->
      <section class="py-8">
        <div class="container mx-auto px-4">
          <div v-if="pending" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Loading reviews...</p>
          </div>
          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-600">Error loading reviews. Please try again later.</p>
          </div>
          <div v-else>
            <div v-if="filteredReviews.length === 0" class="text-center py-12">
              <p class="text-gray-600">No reviews found for this category.</p>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="review in filteredReviews" :key="review.id"
                class="bg-white rounded-lg shadow-md overflow-hidden">
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
                      {{ review.category?.name }}
                    </span>
                    <span class="text-gray-500 text-sm">{{ formatDate(review.created_at) }}</span>
                  </div>
                  <div class="flex items-center gap-2 mb-4">
                    <div class="flex text-yellow-400">
                      <span v-for="n in 5" :key="n" class="text-lg">
                        {{ n <= Math.round(review.rating) ? '★' : '☆' }} </span>
                    </div>
                    <span class="text-gray-600">({{ review.rating }}/5)</span>
                  </div>
                  <p class="text-gray-600 mb-4 line-clamp-3">{{ review.excerpt }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFetch, useRoute, useRouter } from '#app'

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface Review {
  id: string;
  title: string;
  slug: string;
  category: { name: string };
  excerpt: string;
  rating: number;
  featured_image_url?: string;
  created_at: string;
}

const categories = ref<Category[]>([])
const selectedCategory = ref<Category | null>(null)
const reviews = ref<Review[]>([])
const pending = ref(false)
const error = ref<string | null>(null)
const route = useRoute()

const fetchCategories = async () => {
  const { data } = await useFetch('/api/categories', {
    transform: (response) => response?.data || []
  })
  categories.value = data.value
  // If a selected category is provided in the query, use it
  const selectedSlug = route.query.selected
  if (selectedSlug) {
    const found = categories.value.find(
      c => c.slug === selectedSlug || c.name.toLowerCase() === selectedSlug
    )
    if (found) {
      selectedCategory.value = found
    } else {
      selectedCategory.value = categories.value[0]
    }
  } else if (categories.value.length > 0 && !selectedCategory.value) {
    selectedCategory.value = categories.value[0]
  }
}

const fetchReviews = async () => {
  if (!selectedCategory.value) return
  pending.value = true
  error.value = null
  try {
    const { data } = await useFetch('/api/reviews', {
      query: { category: selectedCategory.value.id },
      transform: (response) => response?.data || []
    })
    reviews.value = data.value
  } catch (e) {
    error.value = 'Failed to load reviews.'
  } finally {
    pending.value = false
  }
}

const selectCategory = (category: Category) => {
  selectedCategory.value = category
  fetchReviews() // Immediately fetch reviews for the selected category
}

onMounted(async () => {
  await fetchCategories()
  await fetchReviews()
})

const filteredReviews = computed(() => {
  if (!selectedCategory.value) return []
  // Only show reviews where the review's category_id matches the selected category's id
  return reviews.value.filter(
    (review: any) => {
      // Some APIs return category as an object, some as id, so check both
      return (
        review.category_id === selectedCategory.value.id ||
        review.category?.id === selectedCategory.value.id ||
        review.category === selectedCategory.value.id
      )
    }
  )
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