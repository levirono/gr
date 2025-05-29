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
            <div class="prose prose-lg max-w-none blog-content" v-html="postHtmlContent"></div>
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

      <!-- Other Blogs Section -->
      <section v-if="otherPosts.length" class="py-16 bg-gray-50 border-t mt-16">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold mb-8">More from the Blog</h2>
          <div class="flex flex-col gap-6">
            <NuxtLink v-for="other in otherPosts" :key="other.id" :to="`/blog/${other.slug}`"
              class="flex items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div class="flex-shrink-0 w-28 h-28 bg-gray-200 flex items-center justify-center overflow-hidden">
                <img v-if="other.featured_image_url" :src="other.featured_image_url" :alt="other.title"
                  class="object-cover w-full h-full" />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <span class="text-gray-500">No image</span>
                </div>
              </div>
              <div class="p-6 flex-1 min-w-0">
                <div class="flex items-center gap-4 mb-2">
                  <span class="text-gray-500 text-sm">{{ formatDate(other.published_at) }}</span>
                </div>
                <h3 class="text-lg font-bold mb-1 truncate">{{ other.title }}</h3>
                <p class="text-gray-600 mb-2 line-clamp-2">{{ other.excerpt }}</p>
                <span class="text-blue-600 hover:underline text-sm">Read More →</span>
              </div>
            </NuxtLink>
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

const route = useRoute()
const slug = route.params.slug as string

// Fetch blog post
const { data, pending, error } = await useFetch(`/api/blogs/${slug}`, {
  onResponse({ response }) {
    console.log('Raw API response:', response);
  },
  default: () => ({ data: null })
});

// Extract the post data from the nested response
const post = computed(() => data.value?.data || null);

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
</script>

<style scoped>
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