<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />
    <main>
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-gray-50 via-gray-200 to-gray-400 text-white py-20">
        <div class="container mx-auto px-4 flex flex-col items-center justify-center">
          <div class="max-w-3xl w-full text-center">
            <h1
              class="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Tech Insights & News
            </h1>
            <p
              class="text-xl mb-8 bg-gradient-to-r from-blue-700 via-green-600 to-blue-900 bg-clip-text text-transparent">
              Stay updated with the latest in technology, reviews, and industry insights
            </p>
            <div class="flex justify-center gap-4">
              <input v-model="searchQuery" type="search" placeholder="Search articles..."
                class="px-6 py-3 rounded-full w-full max-w-md text-gray-900">
            </div>
          </div>
        </div>
      </section>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading blog posts...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600">Error loading blog posts. Please try again later.</p>
      </div>

      <!-- Blog Grid -->
      <section v-else class="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
        <div class="container mx-auto px-4">
          <div class="flex flex-col gap-8">
            <NuxtLink v-for="post in filteredPosts" :key="post.id" :to="`/blog/${post.slug}`"
              class="group flex items-center bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-l-8 border-gradient-to-b from-blue-500 to-green-400 hover:scale-[1.025] hover:border-blue-600 focus:ring-4 focus:ring-blue-200 relative animate-fade-in"
              style="min-height:7rem">
              <div
                class="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-blue-100 via-green-100 to-blue-50 flex items-center justify-center overflow-hidden relative">
                <img v-if="post.featured_image_url" :src="post.featured_image_url" :alt="post.title"
                  class="object-cover w-full h-full rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                <div v-else class="w-full h-full flex items-center justify-center">
                  <span class="text-gray-400 flex items-center gap-1 text-2xl">
                    <svg class="w-7 h-7 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    No image
                  </span>
                </div>
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-xl">
                </div>
              </div>
              <div class="p-8 flex-1 min-w-0 flex flex-col justify-center">
                <div class="flex items-center gap-4 mb-2">
                  <span
                    class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-green-400 text-white font-bold text-lg shadow-md border-2 border-white">
                    {{ post.author ? post.author[0].toUpperCase() : '?' }}
                  </span>
                  <span class="text-gray-400 text-sm font-medium">
                    {{ formatDate(post.published_at) }}
                  </span>
                </div>
                <h2
                  class="text-2xl font-extrabold mb-2 truncate text-green-700 flex items-center gap-2 group-hover:text-blue-700 transition-colors">
                  <svg class="w-6 h-6 text-blue-500 group-hover:text-green-500 transition-colors" fill="none"
                    stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  {{ post.title }}
                </h2>
                <p class="text-gray-600 mb-2 line-clamp-3 text-lg leading-relaxed">{{ post.excerpt }}</p>
              </div>
            </NuxtLink>
          </div>
          <!-- Pagination -->
          <div v-if="pagination.total_pages > 1" class="mt-12 flex justify-center gap-2">
            <button v-for="page in pagination.total_pages" :key="page" @click="currentPage = page"
              class="px-4 py-2 rounded-md font-semibold shadow-sm border border-blue-200 transition-colors duration-200"
              :class="currentPage === page ? 'bg-blue-600 text-white border-blue-600 scale-105' : 'bg-white text-gray-600 hover:bg-blue-50'">
              {{ page }}
            </button>
          </div>
          <!-- No Results -->
          <div v-if="filteredPosts.length === 0" class="text-center py-12">
            <p class="text-gray-600">No blog posts found matching your search.</p>
          </div>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="py-16 bg-blue-600 text-white">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
            <p class="mb-8">Subscribe to our newsletter for the latest tech news and reviews</p>
            <div class="flex gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" class="flex-1 px-6 py-3 rounded-lg text-gray-900">
              <button class="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url?: string;
  author: string;
  published_at: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

const searchQuery = ref('')
const currentPage = ref(1)

// Fetch blog posts with pagination
const { data: blogData, pending, error } = await useFetch<{ data: BlogPost[], pagination: Pagination }>('/api/blogs', {
  query: {
    page: currentPage,
    limit: 9
  },
  watch: [currentPage]
})

// Computed properties
const posts = computed(() => blogData.value?.data || [])
const pagination = computed(() => blogData.value?.pagination || { total: 0, page: 1, limit: 9, total_pages: 1 })

// Filter posts based on search query
const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value

  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query) ||
    post.content.toLowerCase().includes(query)
  )
})

// Format date
const formatDate = (date: string) => {
  const now = new Date()
  const postDate = new Date(date)
  const diffTime = Math.abs(now.getTime() - postDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`

  return postDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.animate-fade-in {
  animation: fade-in 0.7s cubic-bezier(.4, 2, .3, 1) both;
}

.blog-content img {
  max-width: 320px;
  max-height: 220px;
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.5rem auto;
  display: block;
}
</style>