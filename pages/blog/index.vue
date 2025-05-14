<template>
    <div class="min-h-screen bg-gray-50">
      <TheHeader />
      <main>
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center">
              <h1 class="text-5xl font-bold mb-6">Tech Insights & News</h1>
              <p class="text-xl mb-8">Stay updated with the latest in technology, reviews, and industry insights</p>
              <div class="flex justify-center gap-4">
                <input 
                  v-model="searchQuery"
                  type="search" 
                  placeholder="Search articles..." 
                  class="px-6 py-3 rounded-full w-full max-w-md text-gray-900"
                >
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
        <section v-else class="py-16">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article 
                v-for="post in filteredPosts" 
                :key="post.id"
                class="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div class="relative h-48">
                  <img 
                    v-if="post.featured_image_url" 
                    :src="post.featured_image_url" 
                    :alt="post.title"
                    class="w-full h-full object-cover"
                  >
                  <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-500">No image available</span>
                  </div>
                </div>
                <div class="p-6">
                  <div class="flex items-center gap-4 mb-4">
                    <span class="text-gray-500 text-sm">{{ formatDate(post.published_at) }}</span>
                  </div>
                  <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
                  <p class="text-gray-600 mb-4 line-clamp-3">{{ post.excerpt }}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="text-gray-600">{{ post.author }}</span>
                    </div>
                    <NuxtLink 
                      :to="`/blog/${post.slug}`" 
                      class="text-blue-600 hover:underline"
                    >
                      Read More →
                    </NuxtLink>
                  </div>
                </div>
              </article>
            </div>
  
            <!-- Pagination -->
            <div v-if="pagination.total_pages > 1" class="mt-12 flex justify-center gap-2">
              <button 
                v-for="page in pagination.total_pages" 
                :key="page"
                @click="currentPage = page"
                class="px-4 py-2 rounded-md"
                :class="currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'"
              >
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
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  class="flex-1 px-6 py-3 rounded-lg text-gray-900"
                >
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