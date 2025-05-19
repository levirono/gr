<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">Latest Reviews</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink v-for="review in latestReviews" :key="review.id" :to="`/reviews/${review.slug}`"
          class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
          <img v-if="review.featured_image_url" :src="review.featured_image_url" :alt="review.title"
            class="aspect-video rounded-lg mb-4 object-cover w-full" />
          <div v-else class="aspect-video bg-gray-200 rounded-lg mb-4"></div>
          <h3 class="font-semibold mb-2">{{ review.title }}</h3>
          <p class="text-sm text-gray-600 mb-2">Posted {{ formatDate(review.created_at) }}</p>
          <span class="text-blue-600 hover:underline text-sm inline-flex items-center">
            Read Review
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Review {
  id: string;
  title: string;
  slug: string;
  review_images: Array<{
    cloudinary_url: string;
  }>;
  created_at: string;
}

const { data: latestReviews } = await useFetch<{ data: Review[] }>('/api/reviews', {
  query: {
    sort: 'latest',
    limit: 4
  },
  transform: (response) => {
    if (!response?.data) return []
    return response.data
  }
})

const formatDate = (date: string | Date) => {
  const now = new Date()
  const reviewDate = new Date(date)
  const diffTime = Math.abs(now.getTime() - reviewDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return reviewDate.toLocaleDateString()
}
</script>