<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />
    
    <main class="py-8">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="pending" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading review...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600">Error loading review. Please try again later.</p>
        </div>

        <!-- Review Content -->
        <div v-else-if="review" class="max-w-4xl mx-auto">
          <!-- Breadcrumb -->
          <div class="mb-8">
            <div class="flex items-center space-x-2 text-sm">
              <NuxtLink to="/" class="text-blue-600 hover:underline">Home</NuxtLink>
              <span class="text-gray-400">/</span>
              <NuxtLink to="/reviews" class="text-blue-600 hover:underline">Reviews</NuxtLink>
              <span class="text-gray-400">/</span>
              <span class="text-gray-600">{{ review.title }}</span>
            </div>
          </div>

          <!-- Hero Section -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div class="relative h-96">
              <img 
                v-if="review.images?.[0]?.cloudinary_url" 
                :src="review.images[0].cloudinary_url" 
                :alt="review.title"
                class="w-full h-full object-cover"
              >
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-500">No image available</span>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 mb-4">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {{ review.category?.name }}
                </span>
                <span class="text-gray-500">{{ formatDate(review.created_at) }}</span>
              </div>
              <h1 class="text-4xl font-bold mb-4">{{ review.title }}</h1>
              <div class="flex items-center gap-2 mb-6">
                <div class="flex text-yellow-400">
                  <span v-for="n in 5" :key="n" class="text-2xl">
                    {{ n <= Math.round(review.rating) ? '★' : '☆' }}
                  </span>
                </div>
                <span class="text-gray-600">({{ review.rating }}/5)</span>
              </div>
              <p class="text-xl text-gray-600 mb-8">{{ review.excerpt }}</p>
            </div>
          </div>

          <!-- Quick Summary -->
          <div class="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 class="text-2xl font-bold mb-6">Quick Summary</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(value, key) in review.quick_summary" :key="key" class="flex flex-col">
                <span class="text-gray-500 text-sm">{{ key }}</span>
                <span class="font-medium">{{ value }}</span>
              </div>
            </div>
          </div>

          <!-- Pros and Cons -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold mb-6">Pros</h2>
              <ul class="space-y-4">
                <li v-for="(pro, index) in review.pros" :key="index" class="flex items-start gap-3">
                  <span class="text-green-500 text-xl">✓</span>
                  <span>{{ pro }}</span>
                </li>
              </ul>
            </div>
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold mb-6">Cons</h2>
              <ul class="space-y-4">
                <li v-for="(con, index) in review.cons" :key="index" class="flex items-start gap-3">
                  <span class="text-red-500 text-xl">×</span>
                  <span>{{ con }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Review Sections -->
          <div class="space-y-8 mb-8">
            <!-- Design Section -->
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold mb-6">Design & Build</h2>
              <div class="prose max-w-none mb-8">
                {{ review.sections?.design?.content }}
              </div>
              <div v-if="review.images?.filter(img => img.section === 'design').length" class="grid grid-cols-2 gap-4">
                <img 
                  v-for="image in review.images.filter(img => img.section === 'design')" 
                  :key="image.id"
                  :src="image.cloudinary_url"
                  :alt="review.title"
                  class="rounded-lg"
                >
              </div>
            </div>

            <!-- Display Section -->
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold mb-6">Display</h2>
              <div class="prose max-w-none mb-8">
                {{ review.sections?.display?.content }}
              </div>
              <div v-if="Object.keys(review.sections?.display?.specs || {}).length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(value, key) in review.sections?.display?.specs" :key="key" class="flex flex-col">
                  <span class="text-gray-500 text-sm">{{ key }}</span>
                  <span class="font-medium">{{ value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Where to Buy -->
          <div v-if="review.retailers?.length" class="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 class="text-2xl font-bold mb-6">Where to Buy</h2>
            <div class="space-y-4">
              <div v-for="retailer in review.retailers" :key="retailer.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 class="font-medium">{{ retailer.name }}</h3>
                  <p class="text-gray-600">${{ retailer.price }}</p>
                </div>
                <a 
                  :href="retailer.link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>

          <!-- Final Verdict -->
          <div class="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 class="text-2xl font-bold mb-6">Final Verdict</h2>
            <div class="prose max-w-none">
              {{ review.verdict }}
            </div>
          </div>

          <!-- Comments Section -->
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold mb-6">Comments</h2>
            
            <!-- Comment Form -->
            <form @submit.prevent="submitComment" class="mb-8">
              <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="newComment.name"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
              </div>
              <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="newComment.email"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
              </div>
              <div class="mb-4">
                <label for="comment" class="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea 
                  id="comment" 
                  v-model="newComment.content"
                  rows="4"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                :disabled="submitting"
              >
                {{ submitting ? 'Posting...' : 'Post Comment' }}
              </button>
            </form>

            <!-- Comments List -->
            <div v-if="comments.length > 0" class="space-y-6">
              <div v-for="comment in comments" :key="comment.id" class="border-b pb-6 last:border-b-0">
                <div class="flex items-center gap-4 mb-2">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-medium">{{ comment.name.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div>
                    <h3 class="font-medium">{{ comment.name }}</h3>
                    <p class="text-sm text-gray-500">{{ formatDate(comment.created_at) }}</p>
                  </div>
                </div>
                <p class="text-gray-700">{{ comment.content }}</p>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              No comments yet. Be the first to comment!
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
  content: string;
  excerpt: string;
  rating: number;
  quick_summary: Record<string, string>;
  pros: string[];
  cons: string[];
  sections: {
    design: {
      content: string;
      images: any[];
    };
    display: {
      content: string;
      specs: Record<string, string>;
    };
  };
  verdict: string;
  retailers: Array<{
    id: string;
    name: string;
    price: number;
    link: string;
  }>;
  images: Array<{
    id: string;
    cloudinary_url: string;
    section: string;
  }>;
  created_at: string;
}

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
}

const route = useRoute()
const slug = route.params.slug

const { data: review, pending, error } = await useFetch<{ data: Review }>(`/api/reviews/${slug}`, {
  transform: (response) => {
    if (!response?.data) return null
    return response.data
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

// Comments state
const comments = ref<Comment[]>([])
const submitting = ref(false)
const newComment = ref({
  name: '',
  email: '',
  content: ''
})

// Fetch comments
const { data: commentsData } = await useFetch<{ data: Comment[] }>(`/api/reviews/${slug}/comments`, {
  transform: (response) => {
    if (!response?.data) return []
    return response.data
  }
})

comments.value = commentsData.value?.data || []

// Submit comment
const submitComment = async () => {
  submitting.value = true
  try {
    const { data } = await useFetch(`/api/reviews/${slug}/comments`, {
      method: 'POST',
      body: newComment.value
    })
    
    if (data.value) {
      comments.value.unshift(data.value)
      newComment.value = {
        name: '',
        email: '',
        content: ''
      }
    }
  } catch (error) {
    console.error('Error posting comment:', error)
  } finally {
    submitting.value = false
  }
}
</script>

<style>
.prose {
  max-width: 65ch;
  color: #374151;
  line-height: 1.75;
}

.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
</style> 