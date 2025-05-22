<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />

    <!-- Image Gallery Modal -->
    <ImageGalleryModal :show="showGalleryModal" :images="review?.processedImages || []"
      @close="showGalleryModal = false" />

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
              <template v-if="review.featured_image_url">
                <img :src="review.featured_image_url" :alt="review.title"
                  class="w-full h-full object-cover cursor-pointer" @click="showGalleryModal = true">
              </template>
              <template v-else>
                <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                </div>
              </template>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 mb-4">
                <span v-if="review.category_id" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {{ getCategoryName(review.category_id) }}
                </span>
                <span class="text-gray-500">{{ formatDate(review.created_at) }}</span>
              </div>
              <h1 class="text-4xl font-bold mb-4">{{ review.title }}</h1>
              <div class="flex items-center gap-2 mb-6">
                <div class="flex text-yellow-400">
                  <span v-for="n in 5" :key="n" class="text-2xl">
                    {{ n <= Math.round(review.rating) ? '★' : '☆' }} </span>
                </div>
                <span class="text-gray-600">({{ review.rating }}/5)</span>
              </div>
              <p class="text-xl text-gray-600 mb-8">{{ review.excerpt }}</p>
            </div>
          </div>

          <!-- Additional Images -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <template v-if="review.processedImages && review.processedImages.length > 0">
              <div v-for="(image, index) in review.processedImages" :key="index"
                class="rounded-lg overflow-hidden h-64">
                <img :src="image" :alt="`${review.title} - Image ${index + 1}`" class="w-full h-full object-cover">
              </div>
            </template>
            <template v-else-if="review.images && review.images.length > 0">
              <div v-for="(image, index) in review.images" :key="index" class="rounded-lg overflow-hidden h-64">
                <img :src="image" :alt="`${review.title} - Image ${index + 1}`" class="w-full h-full object-cover">
              </div>
            </template>
          </div>

          <!-- Quick Summary -->
          <div v-if="review.quick_summary" class="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 class="text-2xl font-bold mb-6">Quick Summary</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(value, key) in review.quick_summary" :key="key" class="flex flex-col">
                <span class="text-gray-500 text-sm capitalize">{{ formatKeyName(key) }}</span>
                <span class="font-medium">{{ value }}</span>
              </div>
            </div>
          </div>



          <!-- Review Sections -->
          <div class="space-y-8 mb-8">
            <!-- Design Section -->
            <div v-if="review.sections && review.sections.design" class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold mb-6">Design & Build</h2>
              <div class="prose max-w-none mb-8" v-html="review.sections.design.content"></div>

              <!-- Design Images -->
              <div class="grid grid-cols-2 gap-4">
                <template v-if="review.processedDesignImages && review.processedDesignImages.length > 0">
                  <div v-for="(image, index) in review.processedDesignImages" :key="index"
                    class="rounded-lg overflow-hidden h-64">
                    <img :src="image" :alt="`${review.title} - Design ${index + 1}`" class="w-full h-full object-cover">
                  </div>
                </template>
                <template v-else-if="review.design_images && review.design_images.length > 0">
                  <div v-for="(image, index) in review.design_images" :key="index"
                    class="rounded-lg overflow-hidden h-64">
                    <img :src="image" :alt="`${review.title} - Design ${index + 1}`" class="w-full h-full object-cover">
                  </div>
                </template>

              </div>
            </div>

            <!-- Display Section -->
            <div v-if="review.sections && review.sections.display" class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold mb-6">Display</h2>
              <div class="prose max-w-none mb-8" v-html="review.sections.display.content"></div>

              <!-- Display Images -->
              <div class="grid grid-cols-2 gap-4 mb-8">
                <template v-if="review.processedDisplayImages && review.processedDisplayImages.length > 0">
                  <div v-for="(image, index) in review.processedDisplayImages" :key="index"
                    class="rounded-lg overflow-hidden h-64">
                    <img :src="image" :alt="`${review.title} - Display ${index + 1}`"
                      class="w-full h-full object-cover">
                  </div>
                </template>

              </div>

              <!-- Display Specs -->
              <div v-if="review.sections.display.specs && Object.keys(review.sections.display.specs).length > 0"
                class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-4 bg-gray-50 rounded-lg">
                <div v-for="(value, key) in review.sections.display.specs" :key="key" class="flex flex-col">
                  <span class="text-gray-500 text-sm capitalize">{{ formatKeyName(key) }}</span>
                  <span class="font-medium">{{ value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Where to Buy -->
          <div v-if="review.retailers && review.retailers.length > 0" class="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 class="text-2xl font-bold mb-6">Where to Buy</h2>
            <div class="space-y-4">
              <div v-for="(retailer, index) in review.retailers" :key="index"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 class="font-medium">{{ retailer.name }}</h3>
                  <p class="text-gray-600">${{ retailer.price }}</p>
                </div>
                <a :href="retailer.link" target="_blank" rel="noopener noreferrer"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Buy Now
                </a>
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

          <!-- Final Verdict -->
          <div class="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 class="text-2xl font-bold mb-6">Final Verdict</h2>
            <div class="prose max-w-none" v-html="review.verdict"></div>
          </div>

          <!-- Comments Section -->
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold mb-6">Comments</h2>

            <!-- Comment Form -->
            <form @submit.prevent="submitComment" class="mb-8">
              <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" id="name" v-model="newComment.name"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required>
              </div>
              <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" v-model="newComment.email"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required>
              </div>
              <div class="mb-4">
                <label for="comment" class="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea id="comment" v-model="newComment.content" rows="4"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required></textarea>
              </div>
              <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                :disabled="submitting">
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
import ImageGalleryModal from '~/components/ImageGalleryModal.vue'
import { ref, onMounted } from 'vue'

interface Review {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  content: string;
  excerpt: string;
  rating: number;
  quick_summary: Record<string, string>;
  pros: string[];
  cons: string[];
  sections: {
    design?: {
      content: string;
    };
    display?: {
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
  featured_image_url: string;
  featured_image_public_id: string;
  is_featured: boolean;
  // Images are stored as JSONB objects in the database
  images: any; // Could be array or object
  design_images: any; // JSONB structure
  display_images: any; // JSONB structure
  created_at: string;
  updated_at: string;
  author_id: string;
}

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
}

// Store for categories
const categories = ref<{ [key: string]: string }>({});

// Fetch categories
const fetchCategories = async () => {
  try {
    const { data } = await useFetch('/api/categories');
    if (data.value) {
      data.value.forEach((category: any) => {
        categories.value[category.id] = category.name;
      });
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Get category name by ID
const getCategoryName = (categoryId: string) => {
  return categories.value[categoryId] || 'Uncategorized';
};

// Format key names
const formatKeyName = (key: string) => {
  // Convert camelCase or snake_case to readable format
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();
};

const route = useRoute();
const slug = route.params.slug;

// Fetch review data and handle JSONB image structures
const { data: reviewData, pending, error } = await useFetch<any>(`/api/reviews/${slug}`, {
  transform: (response: any) => {
    if (!response?.data) return null;

    const data = response.data;

    // Process images - handle different possible structures
    // For standard images array
    if (data.images) {
      if (typeof data.images === 'string') {
        // If it's a JSON string, parse it
        try {
          data.processedImages = JSON.parse(data.images);
        } catch (e) {
          data.processedImages = [];
        }
      } else if (Array.isArray(data.images)) {
        // It's already an array
        data.processedImages = data.images;
      } else if (typeof data.images === 'object') {
        // It's a JSONB object with URLs
        data.processedImages = extractImageUrls(data.images);
      } else {
        data.processedImages = [];
      }
    } else {
      data.processedImages = [];
    }

    // Process design images - handle JSONB structure
    if (data.design_images) {
      if (typeof data.design_images === 'string') {
        try {
          data.processedDesignImages = JSON.parse(data.design_images);
        } catch (e) {
          data.processedDesignImages = [];
        }
      } else if (Array.isArray(data.design_images)) {
        data.processedDesignImages = data.design_images;
      } else if (typeof data.design_images === 'object') {
        data.processedDesignImages = extractImageUrls(data.design_images);
      } else {
        data.processedDesignImages = [];
      }
    } else {
      data.processedDesignImages = [];
    }

    // Process display images - handle JSONB structure
    if (data.display_images) {
      if (typeof data.display_images === 'string') {
        try {
          data.processedDisplayImages = JSON.parse(data.display_images);
        } catch (e) {
          data.processedDisplayImages = [];
        }
      } else if (Array.isArray(data.display_images)) {
        data.processedDisplayImages = data.display_images;
      } else if (typeof data.display_images === 'object') {
        data.processedDisplayImages = extractImageUrls(data.display_images);
      } else {
        data.processedDisplayImages = [];
      }
    } else {
      data.processedDisplayImages = [];
    }

    // Debug image data
    console.log('Raw image data:', {
      featured: data.featured_image_url ? 'Yes' : 'No',
      images: data.images,
      design_images: data.design_images,
      display_images: data.display_images
    });

    console.log('Processed image data:', {
      processedImages: data.processedImages,
      processedDesignImages: data.processedDesignImages,
      processedDisplayImages: data.processedDisplayImages
    });

    return data;
  }
});

const review = ref(reviewData.value);
const showGalleryModal = ref(false);

// Helper function to extract image URLs from JSONB objects
function extractImageUrls(jsonbData: any): string[] {
  const urls: string[] = [];

  // If it's not an object or array, return empty array
  if (!jsonbData || typeof jsonbData !== 'object') {
    return urls;
  }

  // Case 1: Array of objects with URL properties
  if (Array.isArray(jsonbData)) {
    jsonbData.forEach(item => {
      if (item && typeof item === 'object') {
        // Look for common URL field names
        ['url', 'src', 'source', 'path', 'image_url', 'cloudinary_url'].forEach(key => {
          if (item[key] && typeof item[key] === 'string') {
            urls.push(item[key]);
          }
        });
      } else if (typeof item === 'string' && isValidUrl(item)) {
        // If array contains direct URL strings
        urls.push(item);
      }
    });
    return urls;
  }

  // Case 2: Object with URL properties at top level
  ['url', 'src', 'source', 'path', 'image_url', 'cloudinary_url'].forEach(key => {
    if (jsonbData[key] && typeof jsonbData[key] === 'string') {
      urls.push(jsonbData[key]);
    }
  });

  // Case 3: Object with numeric keys (like {0: {url: '...'}, 1: {url: '...'}})
  Object.keys(jsonbData).forEach(key => {
    const item = jsonbData[key];
    if (item && typeof item === 'object') {
      ['url', 'src', 'source', 'path', 'image_url', 'cloudinary_url'].forEach(urlKey => {
        if (item[urlKey] && typeof item[urlKey] === 'string') {
          urls.push(item[urlKey]);
        }
      });
    } else if (typeof item === 'string' && isValidUrl(item)) {
      urls.push(item);
    }
  });

  return urls;
}

// Helper to validate URLs
function isValidUrl(str: string): boolean {
  // Basic URL validation
  return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/');
}

// Format date to relative time
const formatDate = (date: string) => {
  const now = new Date();
  const reviewDate = new Date(date);
  const diffTime = Math.abs(now.getTime() - reviewDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return reviewDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Comments state
const comments = ref<Comment[]>([]);
const submitting = ref(false);
const newComment = ref({
  name: '',
  email: '',
  content: ''
});

// Fetch comments
const { data: commentsData } = await useFetch<{ data: Comment[] }>(`/api/reviews/${slug}/comments`, {
  transform: (response) => {
    if (!response?.data) return [];
    return response.data;
  }
});

comments.value = commentsData.value || [];

// Submit comment
const submitComment = async () => {
  submitting.value = true;
  try {
    const { data } = await useFetch(`/api/reviews/${slug}/comments`, {
      method: 'POST',
      body: newComment.value
    });

    if (data.value) {
      comments.value.unshift(data.value);
      newComment.value = {
        name: '',
        email: '',
        content: ''
      };
    }
  } catch (error) {
    console.error('Error posting comment:', error);
  } finally {
    submitting.value = false;
  }
};

// Fetch categories on component mount
// Check if image URLs actually exist and are accessible
const validateImages = async () => {
  if (!review.value) return;

  try {
    console.log('======= Image Validation Report =======');

    // Featured image
    if (review.value.featured_image_url) {
      console.log(`✅ Featured image URL: ${review.value.featured_image_url}`);
    } else {
      console.log('❌ No featured image URL found');
    }

    // General images
    if (review.value.processedImages && review.value.processedImages.length > 0) {
      console.log(`✅ Processed images (${review.value.processedImages.length}):`);
      review.value.processedImages.forEach((url, i) => {
        console.log(`  - Image ${i + 1}: ${url}`);
      });
    } else {
      console.log('❌ No processedImages found');
    }

    // Design images
    if (review.value.processedDesignImages && review.value.processedDesignImages.length > 0) {
      console.log(`✅ Processed design images (${review.value.processedDesignImages.length}):`);
      review.value.processedDesignImages.forEach((url, i) => {
        console.log(`  - Design image ${i + 1}: ${url}`);
      });
    } else {
      console.log('❌ No processedDesignImages found');
    }

    // Display images
    if (review.value.processedDisplayImages && review.value.processedDisplayImages.length > 0) {
      console.log(`✅ Processed display images (${review.value.processedDisplayImages.length}):`);
      review.value.processedDisplayImages.forEach((url, i) => {
        console.log(`  - Display image ${i + 1}: ${url}`);
      });
    } else {
      console.log('❌ No processedDisplayImages found');
    }

    console.log('=======================================');
  } catch (err) {
    console.error('Error validating images:', err);
  }
};

onMounted(() => {
  fetchCategories();
  validateImages();
});
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