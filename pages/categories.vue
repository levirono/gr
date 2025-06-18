<template>
  <div class="min-h-screen">
    <TheHeader />
    <main>
      <!-- Category Selector -->
      <section class="bg-gray-50 py-8">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold mb-4 text-green-700 flex items-center gap-2">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            Device Categories
          </h1>
          <p class="text-green-600 mb-6">Browse reviews by device category</p>
          <div class="flex flex-wrap gap-4 mb-4">
            <button v-for="category in categories" :key="category.id" @click="selectCategory(category)" :class="[
              'px-4 py-2 rounded-full border transition',
              selectedCategory?.id === category.id
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-green-700 border-green-300 hover:bg-green-50'
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
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p class="mt-4 text-green-600">Loading reviews...</p>
          </div>
          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-600">Error loading reviews. Please try again later.</p>
          </div>
          <div v-else>
            <div v-if="filteredReviews.length === 0" class="text-center py-12">
              <p class="text-green-600 flex items-center justify-center gap-2">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
                No reviews found for this category.
              </p>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="review in filteredReviews" :key="review.id"
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
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useFetch, useRoute, useRouter } from '#app'

interface Category {
  id: string;
  name: string;
  slug: string; // Added slug property
  icon: string; // Made icon required
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
const router = useRouter()

const fetchCategories = async () => {
  const { data } = await useFetch('/api/categories', {
    transform: (response) => response?.data || []
  })
  categories.value = (data.value || []).map((cat: any) => ({
    id: String(cat.id),
    name: String(cat.name),
    slug: String(cat.slug ?? cat.name?.toLowerCase().replace(/\s+/g, '-')),
    icon: String(cat.icon ?? '📦')
  }))
  // If a selected category is provided in the query, use it
  const selectedSlug = route.query.selected
  if (selectedSlug) {
    const found = categories.value.find(
      c => c.slug === selectedSlug || c.name.toLowerCase() === selectedSlug
    )
    if (found) {
      selectedCategory.value = found
    } else if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0]
    } else {
      selectedCategory.value = null
    }
  } else if (categories.value.length > 0 && !selectedCategory.value) {
    selectedCategory.value = categories.value[0]
  } else {
    selectedCategory.value = null
  }
}

const fetchReviews = async () => {
  if (!selectedCategory.value) {
    reviews.value = [];
    return;
  }
  pending.value = true
  error.value = null
  try {
    const { data } = await useFetch('/api/reviews', {
      query: { category: selectedCategory.value.id },
      transform: (response) => response?.data || []
    });
    // Only include reviews whose category matches the selectedCategory (by id or name)
    reviews.value = (data.value ?? []).filter(r => {
      if (!r.category || !selectedCategory.value) return false;
      // r.category can be an object or string
      if (typeof r.category === 'object' && r.category.id) {
        return String(r.category.id) === String(selectedCategory.value.id);
      }
      if (typeof r.category === 'object' && r.category.name) {
        return r.category.name === selectedCategory.value.name;
      }
      if (typeof r.category === 'string') {
        return r.category === selectedCategory.value.id || r.category === selectedCategory.value.name;
      }
      return false;
    });
  } catch (e) {
    error.value = 'Failed to load reviews.'
  } finally {
    pending.value = false
  }
}

const selectCategory = (category: Category) => {
  selectedCategory.value = category
  // Update the route query for persistence
  router.replace({ query: { ...route.query, selected: category.slug } })
  fetchReviews() // Immediately fetch reviews for the selected category
}
// Reactively fetch reviews when the selected category changes (e.g., via route query)
watch(() => selectedCategory.value, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) fetchReviews()
})
// Watch for changes in the route query to update selectedCategory and fetch reviews
watch(
  () => route.query.selected,
  (selectedSlug) => {
    if (!selectedSlug) return;
    const found = categories.value.find(
      c => c.slug === selectedSlug || c.name.toLowerCase() === selectedSlug
    );
    if (found) {
      if (!selectedCategory.value || selectedCategory.value.id !== found.id) {
        selectedCategory.value = found;
        fetchReviews();
      }
    }
  }
);

onMounted(async () => {
  await fetchCategories()
  await fetchReviews()
})

const filteredReviews = computed(() => {
  // Since fetchReviews already filters by category, just return reviews.value
  return reviews.value
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