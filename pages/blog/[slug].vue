<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />
    <main>
      <!-- Breadcrumb -->
      <div class="bg-white border-b">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center space-x-2 text-sm">
            <NuxtLink to="/" class="text-blue-600 hover:underline">Home</NuxtLink>
            <span class="text-gray-400">/</span>
            <NuxtLink to="/blog" class="text-blue-600 hover:underline">Blog</NuxtLink>
            <span class="text-gray-400">/</span>
            <span class="text-gray-600 truncate">{{ post?.title }}</span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading blog post...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600">Error loading blog post. Please try again later.</p>
        <NuxtLink to="/blog" class="mt-4 inline-block text-blue-600 hover:underline">
          Return to Blog
        </NuxtLink>
      </div>

      <!-- Blog Content -->
      <article v-else-if="post" class="py-16">
        <div class="container mx-auto px-4">
          <!-- Header -->
          <div class="max-w-4xl mx-auto mb-16">
            <h1 class="text-4xl md:text-6xl font-bold mb-8 text-green-700 leading-tight">
              {{ post.title }}
            </h1>
            <div class="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="font-medium">{{ post.author }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(post.published_at) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ readingTime }} min read</span>
              </div>
            </div>
            <!-- Article excerpt/description -->
            <div v-if="post.excerpt" class="text-xl text-gray-700 leading-relaxed border-l-4 border-green-500 pl-6 bg-green-50 py-4 rounded-r-lg">
              {{ post.excerpt }}
            </div>
          </div>

          <!-- Featured Image -->
          <div v-if="post.featured_image_url" class="mb-16">
            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
              <img :src="post.featured_image_url" :alt="post.title"
                class="w-full h-auto max-h-[500px] object-cover transition-transform duration-300 hover:scale-105">
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          <!-- Content -->
          <div class="max-w-4xl mx-auto">
            <div class="prose prose-xl prose-green max-w-none blog-content" v-html="postHtmlContent"></div>
          </div>

          <!-- Back to Blog -->
          <div class="mt-12 pt-8 border-t">
            <NuxtLink
              to="/blog"
              class="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </NuxtLink>
          </div>
        </div>
      </article>

      <!-- Not Found -->
      <div v-else class="text-center py-12">
        <p class="text-gray-600">Blog post not found.</p>
        <NuxtLink to="/blog" class="mt-4 inline-block text-blue-600 hover:underline">
          Return to Blog
        </NuxtLink>
      </div>

      <!-- Other Blogs Section -->
      <section v-if="otherPosts.length" class="py-16 bg-gray-50 border-t mt-16">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-8 text-green-700 flex items-center gap-2">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            More from the Blog
          </h2>
          <div class="flex flex-col gap-8">
            <NuxtLink v-for="other in otherPosts" :key="other.id" :to="`/blog/${other.slug}`"
              class="group flex items-center bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-l-8 border-gradient-to-b from-blue-500 to-green-400 hover:scale-[1.025] hover:border-blue-600 focus:ring-4 focus:ring-blue-200 relative animate-fade-in"
              style="min-height:7rem">
              <div
                class="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-blue-100 via-green-100 to-blue-50 flex items-center justify-center overflow-hidden relative">
                <img v-if="other.featured_image_url" :src="other.featured_image_url" :alt="other.title"
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
                    {{ other.author ? other.author[0].toUpperCase() : '?' }}
                  </span>
                  <span class="text-gray-400 text-sm font-medium">
                    {{ formatDate(other.published_at) }}
                  </span>
                </div>
                <h3
                  class="text-2xl font-extrabold mb-2 truncate text-green-700 flex items-center gap-2 group-hover:text-blue-700 transition-colors">
                  <svg class="w-6 h-6 text-blue-500 group-hover:text-green-500 transition-colors" fill="none"
                    stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  {{ other.title }}
                </h3>
                <p class="text-gray-600 mb-2 line-clamp-3 text-lg leading-relaxed">{{ other.excerpt }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Blog Comments Section -->
      <section v-if="post" class="max-w-2xl mx-auto mt-12 mb-24">
        <h2 class="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Comments
        </h2>
        <div v-if="commentsPending" class="text-center py-4">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p class="mt-2 text-gray-600">Loading comments...</p>
        </div>
        <div v-else>
          <div v-if="comments.length === 0" class="text-gray-400 mb-6 text-center italic">No comments yet. Be the first
            to comment!</div>
          <div class="relative mb-8">
            <ul
              class="space-y-6 max-h-64 overflow-y-auto pr-2 bg-green-50 rounded-2xl shadow border border-green-100 p-4">
              <li v-for="comment in comments" :key="comment.id" class="pb-4">
                <div class="flex items-center gap-3 mb-1">
                  <div
                    class="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-700 text-lg">
                    {{ comment.name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <span class="font-semibold text-green-800">{{ comment.name }}</span>
                    <span class="text-gray-400 text-xs ml-2">{{ formatDate(comment.created_at) }}</span>
                  </div>
                </div>
                <div class="text-gray-700 bg-white rounded-lg px-4 py-2 border border-green-100">{{ comment.content }}
                </div>
              </li>
            </ul>
            <div v-if="comments.length > 5"
              class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-green-50 to-transparent pointer-events-none">
            </div>
          </div>
        </div>
        <form @submit.prevent="submitComment" class="bg-white p-8 rounded-2xl shadow border border-green-100 space-y-4">
          <h3 class="text-lg font-semibold mb-2 text-green-700">Leave a Comment</h3>
          <div class="flex flex-col gap-3 md:flex-row md:gap-6">
            <input v-model="commentForm.name" type="text" placeholder="Name" required
              class="border border-green-200 rounded px-4 py-2 bg-green-50 focus:ring-2 focus:ring-green-400 focus:outline-none flex-1" />
            <input v-model="commentForm.email" type="email" placeholder="Email" required
              class="border border-green-200 rounded px-4 py-2 bg-green-50 focus:ring-2 focus:ring-green-400 focus:outline-none flex-1" />
          </div>
          <textarea v-model="commentForm.content" placeholder="Your comment..." required rows="3"
            class="border border-green-200 rounded px-4 py-2 bg-green-50 focus:ring-2 focus:ring-green-400 focus:outline-none w-full"></textarea>
          <button type="submit" :disabled="commentSubmitting"
            class="bg-green-600 text-white px-6 py-2 rounded-md font-bold hover:bg-green-700 transition disabled:opacity-50">
            {{ commentSubmitting ? 'Posting...' : 'Post Comment' }}
          </button>
          <div v-if="commentError" class="text-red-600 mt-2">{{ commentError }}</div>
          <div v-if="commentSuccess" class="text-green-600 mt-2">Comment posted!</div>
        </form>
      </section>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useHead } from '#imports'

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

const route = useRoute()
const slug = route.params.slug as string

// Fetch blog post
const { data, pending, error } = await useFetch<{ data: BlogPost | null }>(`/api/blogs/${slug}`, {
  onResponse({ response }) {
    console.log('Raw API response:', response);
  },
  default: () => ({ data: null })
});

// Extract the post data from the nested response
const post = computed(() => data.value?.data || null);

// Calculate reading time
const readingTime = computed(() => {
  if (!post.value?.content) return 0;
  const wordsPerMinute = 200;
  const textContent = post.value.content.replace(/<[^>]*>/g, '');
  const wordCount = textContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Use Nuxt's inject to get the markdown parser
const $markdown = (useNuxtApp() as any).$markdown as (markdown: string) => string;

// Computed property for HTML content
const postHtmlContent = computed(() => {
  if (!post.value?.content) return '';
  return $markdown(post.value.content);
});

console.log('Post data:', post.value);
console.log('Published at:', post.value?.published_at);

// Format date
const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) {
    return 'Date not available';
  }

  try {
    const postDate = new Date(dateString);

    // Check if the date is valid
    if (isNaN(postDate.getTime())) {
      console.error('Invalid date format:', dateString);
      return 'Date not available';
    }

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - postDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return postDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'Date not available';
  }
};

// Fetch other blog posts (excluding the current one)
const { data: allBlogsData } = await useFetch('/api/blogs', {
  query: { limit: 6 },
})

const otherPosts = computed(() => {
  const all = allBlogsData.value?.data || []
  // Exclude the current post by slug
  return all.filter((b: any) => b.slug !== slug)
})

// Blog Comments Logic
const comments = ref<any[]>([])
const commentsPending = ref(true)
const commentForm = ref({ name: '', email: '', content: '' })
const commentSubmitting = ref(false)
const commentError = ref('')
const commentSuccess = ref(false)

async function fetchComments() {
  commentsPending.value = true
  commentError.value = ''
  try {
    const { data } = await $fetch(`/api/blogs/${slug}/comments`)
    comments.value = data || []
  } catch (e) {
    commentError.value = 'Failed to load comments.'
  } finally {
    commentsPending.value = false
  }
}

async function submitComment() {
  commentSubmitting.value = true
  commentError.value = ''
  commentSuccess.value = false
  try {
    await $fetch(`/api/blogs/${slug}/comments`, {
      method: 'POST',
      body: { ...commentForm.value }
    })
    commentForm.value = { name: '', email: '', content: '' }
    commentSuccess.value = true
    fetchComments()
  } catch (e) {
    commentError.value = 'Failed to post comment.'
  } finally {
    commentSubmitting.value = false
    setTimeout(() => (commentSuccess.value = false), 2000)
  }
}

watch(post, (val) => {
  if (val) fetchComments()
})

// Initial fetch
await fetchComments();

// Set Open Graph and Twitter Card meta tags for social sharing (title, image, excerpt)
if (post.value) {
  useHead({
    title: post.value.title,
    meta: [
      { property: 'og:title', content: post.value.title },
      { property: 'og:description', content: post.value.excerpt || '' },
      { property: 'og:image', content: post.value.featured_image_url || '' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: window?.location?.href || '' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.value.title },
      { name: 'twitter:description', content: post.value.excerpt || '' },
      { name: 'twitter:image', content: post.value.featured_image_url || '' }
    ]
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

.blog-content {
  /* Remove max-width so content stretches to container */
  max-width: 100%;
  line-height: 1.8;
  color: #374151;
}

.blog-content p {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  font-size: 1.125rem;
  line-height: 1.8;
  text-align: justify;
}

.blog-content h1,
.blog-content h2,
.blog-content h3,
.blog-content h4,
.blog-content h5,
.blog-content h6 {
  color: #059669;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.blog-content h1 {
  font-size: 2.25rem;
  border-bottom: 3px solid #10b981;
  padding-bottom: 0.5rem;
}

.blog-content h2 {
  font-size: 1.875rem;
  border-bottom: 2px solid #34d399;
  padding-bottom: 0.25rem;
}

.blog-content h3 {
  font-size: 1.5rem;
}

.blog-content h4 {
  font-size: 1.25rem;
}

.blog-content blockquote {
  border-left: 4px solid #10b981;
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 0.5rem 0.5rem 0;
  font-style: italic;
  position: relative;
}

.blog-content blockquote::before {
  content: '"';
  font-size: 4rem;
  color: #10b981;
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  font-family: serif;
}

.blog-content code {
  background-color: #f3f4f6;
  color: #059669;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.blog-content pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 2rem 0;
  border: 1px solid #374151;
}

.blog-content pre code {
  background: none;
  color: inherit;
  padding: 0;
  font-size: 0.875rem;
}

.blog-content ul,
.blog-content ol {
  margin: 1.5rem 0;
  padding-left: 2rem;
}

.blog-content li {
  margin: 0.5rem 0;
  line-height: 1.7;
}

.blog-content ul li::marker {
  color: #10b981;
}

.blog-content ol li::marker {
  color: #10b981;
  font-weight: 600;
}

.blog-content a {
  color: #059669;
  text-decoration: underline;
  text-decoration-color: #34d399;
  text-underline-offset: 3px;
  transition: all 0.2s ease;
}

.blog-content a:hover {
  color: #047857;
  text-decoration-color: #10b981;
}

.blog-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  margin: 2rem auto;
  display: block;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
}

.blog-content img:hover {
  transform: scale(1.02);
}

.blog-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.blog-content th,
.blog-content td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.blog-content th {
  background-color: #059669;
  color: white;
  font-weight: 600;
}

.blog-content tr:hover {
  background-color: #f9fafb;
}

.blog-content hr {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #10b981, transparent);
  margin: 3rem 0;
}

/* Reading progress indicator */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(16, 185, 129, 0.2);
  z-index: 1000;
}

.reading-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #34d399);
  width: 0%;
  transition: width 0.1s ease;
}
</style>