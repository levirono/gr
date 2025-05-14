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
          <div class="max-w-4xl mx-auto mb-12">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ post.title }}</h1>
            <div class="flex items-center gap-6 text-gray-600">
              <div class="flex items-center gap-2">
                <span>{{ post.author }}</span>
              </div>
              <span>{{ formatDate(post.published_at) }}</span>
            </div>
          </div>

          <!-- Featured Image -->
          <div v-if="post.featured_image_url" class="max-w-5xl mx-auto mb-12">
            <img :src="post.featured_image_url" :alt="post.title"
              class="w-full h-[400px] object-cover rounded-2xl shadow-lg">
          </div>

          <!-- Content -->
          <div class="max-w-4xl mx-auto">
            <div class="prose prose-lg max-w-none" v-html="post.content"></div>
          </div>

          <!-- Back to Blog -->
          <div class="max-w-4xl mx-auto mt-12 pt-8 border-t">
            <NuxtLink to="/blog" class="inline-flex items-center text-blue-600 hover:underline">
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

const route = useRoute()
const slug = route.params.slug as string

// Fetch blog post
const { data, pending, error } = await useFetch(`/api/blogs/${slug}`, {
  onResponse({ response }) {
    console.log('Raw API response:', response);
  }
});

// Extract the post data from the nested response
const post = computed(() => data.value?.data || null);

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
</script>

<!-- <style>
.prose img {
  @apply rounded-lg my-8 shadow-lg;
}

.prose h2 {
  @apply text-3xl font-bold mt-12 mb-6 text-gray-900;
}

.prose h3 {
  @apply text-2xl font-bold mt-8 mb-4 text-gray-900;
}

.prose p {
  @apply mb-6 leading-relaxed text-gray-700;
}

.prose ul {
  @apply list-disc list-inside mb-6 text-gray-700;
}

.prose ol {
  @apply list-decimal list-inside mb-6 text-gray-700;
}

.prose li {
  @apply mb-2;
}

.prose blockquote {
  @apply border-l-4 border-blue-600 pl-4 italic my-6 text-gray-700;
}

.prose a {
  @apply text-blue-600 hover:underline;
}

.prose code {
  @apply bg-gray-100 px-2 py-1 rounded text-sm;
}

.prose pre {
  @apply bg-gray-100 p-4 rounded-lg overflow-x-auto my-6 text-sm;
}

.prose strong {
  @apply font-bold text-gray-900;
}

.prose em {
  @apply italic text-gray-700;
}

.prose hr {
  @apply my-8 border-gray-200;
}

.prose table {
  @apply w-full mb-6;
}

.prose th {
  @apply bg-gray-100 px-4 py-2 text-left font-bold text-gray-900;
}

.prose td {
  @apply border px-4 py-2 text-gray-700;
}
</style>  -->