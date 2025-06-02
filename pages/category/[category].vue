<template>
  <div class="min-h-screen">
    <TheHeader />
    <main>
      <!-- Category Hero Section -->
      <section class="bg-gray-50 py-12">
        <div class="container mx-auto px-4">
          <div class="flex items-center gap-4 mb-4">
            <NuxtLink to="/categories" class="text-green-600 hover:underline">Categories</NuxtLink>
            <span class="text-gray-400">/</span>
            <h1 class="text-4xl font-bold text-green-700 flex items-center gap-2">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              {{ categoryData.name }}
            </h1>
          </div>
          <p class="text-green-600">{{ categoryData.description }}</p>
        </div>
      </section>

      <!-- Filter Section -->
      <section class="py-8">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap gap-4 mb-8">
            <select class="border rounded-md px-4 py-2">
              <option>Sort by: Latest</option>
              <option>Sort by: Rating</option>
              <option>Sort by: Price</option>
            </select>
            <select class="border rounded-md px-4 py-2">
              <option>All Brands</option>
              <option v-for="brand in categoryData.brands" :key="brand">{{ brand }}</option>
            </select>
            <input type="search" :placeholder="`Search ${categoryData.name.toLowerCase()}...`"
              class="border rounded-md px-4 py-2 flex-grow">
          </div>
        </div>
      </section>

      <!-- Featured Review -->
      <section class="py-8 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            Featured Review
          </h2>
          <div class="bg-green-50 rounded-lg overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div class="aspect-video bg-green-100 flex items-center justify-center">
                <svg class="w-16 h-16 text-green-300" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none" />
                  <path d="M8 16l2-2 4 4 4-6" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
              </div>
              <div class="p-8">
                <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mb-4 inline-block">
                  Featured
                </span>
                <h3 class="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                    <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                  </svg>
                  {{ categoryData.featuredReview.title }}
                </h3>
                <p class="text-green-600 mb-4">{{ categoryData.featuredReview.excerpt }}</p>
                <div class="flex items-center gap-4">
                  <span class="text-yellow-400">★★★★★</span>
                  <span class="text-gray-500">Posted {{ categoryData.featuredReview.date }}</span>
                </div>
                <NuxtLink :to="categoryData.featuredReview.link"
                  class="text-green-600 hover:underline mt-4 inline-block">
                  Read Full Review →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Reviews Grid -->
      <section class="py-8">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
            </svg>
            Latest Reviews
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="review in categoryData.reviews" :key="review.id"
              class="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
              <div class="aspect-video bg-green-50 flex items-center justify-center">
                <svg class="w-10 h-10 text-green-300" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none" />
                  <path d="M8 16l2-2 4 4 4-6" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-2">
                  <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {{ review.brand }}
                  </span>
                  <span class="ml-2 text-yellow-400">{{ review.rating }}</span>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-green-700 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                    <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                  </svg>
                  {{ review.title }}
                </h3>
                <p class="text-gray-600 mb-4">{{ review.excerpt }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500">{{ review.date }}</span>
                  <NuxtLink :to="review.link" class="text-green-600 hover:underline">
                    Read Review →
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Category Stats -->
      <section class="py-8 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg p-6 text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ categoryData.stats.totalReviews }}</div>
              <div class="text-green-700">Total Reviews</div>
            </div>
            <div class="bg-white rounded-lg p-6 text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ categoryData.stats.avgRating }}</div>
              <div class="text-green-700">Average Rating</div>
            </div>
            <div class="bg-white rounded-lg p-6 text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ categoryData.stats.brands }}</div>
              <div class="text-green-700">Brands Reviewed</div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
const route = useRoute()
const category = route.params.category

// This would typically come from an API or database
const categoryData = {
  name: 'Smartphones', // This would be dynamic based on the category
  description: 'Find detailed reviews of the latest smartphones and mobile devices.',
  icon: '📱',
  brands: ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus'],
  featuredReview: {
    title: 'iPhone 15 Pro Max Review',
    excerpt: 'The latest flagship from Apple brings revolutionary features and improvements...',
    date: '2 days ago',
    link: '/reviews/iphone-15-pro-max'
  },
  reviews: [
    {
      id: 1,
      title: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      rating: '★★★★★',
      excerpt: 'A powerful flagship with impressive camera capabilities...',
      date: '1 day ago',
      link: '/reviews/samsung-galaxy-s24-ultra'
    },
    {
      id: 2,
      title: 'Google Pixel 8 Pro',
      brand: 'Google',
      rating: '★★★★☆',
      excerpt: 'Google\'s latest offering with exceptional AI features...',
      date: '3 days ago',
      link: '/reviews/google-pixel-8-pro'
    },
    {
      id: 3,
      title: 'OnePlus 12',
      brand: 'OnePlus',
      rating: '★★★★☆',
      excerpt: 'Flagship killer returns with impressive specs...',
      date: '5 days ago',
      link: '/reviews/oneplus-12'
    }
  ],
  stats: {
    totalReviews: 45,
    avgRating: '4.5',
    brands: 8
  }
}

// You would typically fetch this data based on the category
// For example:
// const { data } = await useFetch(`/api/categories/${category}`)
</script>