<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />
    <main class="py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8">Add New Review</h1>

        <form @submit.prevent="handleSubmit" class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <!-- Basic Information -->
          <div class="space-y-6">
            <h2 class="text-xl font-semibold mb-4">Basic Information</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input v-model="review.title" type="text" required class="w-full px-3 py-2 border rounded-md">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select v-model="review.category_id" required
                  class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select a category</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="laptops">Laptops</option>
                  <option value="tablets">Tablets</option>
                  <option value="wearables">Wearables</option>
                  <option value="audio">Audio</option>
                  <option value="cameras">Cameras</option>
                  <option value="gaming">Gaming</option>
                  <option value="accessories">Accessories</option>
                </select>
                <p class="mt-1 text-sm text-gray-500">Choose the device category for this review</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                <input v-model.number="review.rating" type="number" min="0" max="5" step="0.1" required
                  class="w-full px-3 py-2 border rounded-md">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Featured Review</label>
                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input v-model="review.is_featured" type="checkbox" class="rounded border-gray-300">
                    <span class="ml-2">Mark as featured</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea v-model="review.excerpt" required rows="3"
                class="w-full px-3 py-2 border rounded-md"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea v-model="review.content" required rows="6"
                class="w-full px-3 py-2 border rounded-md"></textarea>
            </div>
          </div>

          <!-- Featured Image -->
          <div class="mt-8 space-y-6">
            <h2 class="text-xl font-semibold mb-4">Featured Image</h2>
            <div class="space-y-4">
              <div v-if="review.featured_image_url" class="relative group">
                <img :src="review.featured_image_url" alt="Featured Image" class="w-full h-48 object-cover rounded-lg">
                <div
                  class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button @click="removeFeaturedImage" class="text-white hover:text-red-500">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div v-else>
                <input ref="featuredImageInput" type="file" accept="image/*" class="hidden"
                  @change="handleFeaturedImageUpload">
                <button type="button" @click="triggerFeaturedImageUpload" class="text-blue-600 hover:text-blue-800">
                  + Upload Featured Image
                </button>
              </div>
              <p v-if="uploadStatus" :class="uploadStatus.type === 'error' ? 'text-red-600' : 'text-green-600'">
                {{ uploadStatus.message }}
              </p>
            </div>
          </div>

          <!-- Quick Summary -->
          <div class="mt-8 space-y-6">
            <h2 class="text-xl font-semibold mb-4">Quick Summary</h2>
            <div class="space-y-4">
              <div v-for="(value, key) in review.quick_summary" :key="key" class="grid grid-cols-2 gap-4">
                <input v-model="summaryKeys[key]" type="text" placeholder="Key" class="px-3 py-2 border rounded-md">
                <div class="flex gap-2">
                  <input v-model="review.quick_summary[key]" type="text" placeholder="Value"
                    class="flex-1 px-3 py-2 border rounded-md">
                  <button type="button" @click="removeSummaryItem(key)"
                    class="px-3 py-2 text-red-600 hover:text-red-800">
                    Remove
                  </button>
                </div>
              </div>
              <button type="button" @click="addSummaryItem" class="text-blue-600 hover:text-blue-800">
                + Add Summary Item
              </button>
            </div>
          </div>

          <!-- Pros and Cons -->
          <div class="mt-8 space-y-6">
            <h2 class="text-xl font-semibold mb-4">Pros and Cons</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="font-medium mb-4">Pros</h3>
                <div class="space-y-4">
                  <div v-for="(pro, index) in review.pros" :key="index" class="flex gap-2">
                    <input v-model="review.pros[index]" type="text" placeholder="Pro"
                      class="flex-1 px-3 py-2 border rounded-md">
                    <button type="button" @click="removePro(index)" class="px-3 py-2 text-red-600 hover:text-red-800">
                      Remove
                    </button>
                  </div>
                  <button type="button" @click="addPro" class="text-blue-600 hover:text-blue-800">
                    + Add Pro
                  </button>
                </div>
              </div>

              <div>
                <h3 class="font-medium mb-4">Cons</h3>
                <div class="space-y-4">
                  <div v-for="(con, index) in review.cons" :key="index" class="flex gap-2">
                    <input v-model="review.cons[index]" type="text" placeholder="Con"
                      class="flex-1 px-3 py-2 border rounded-md">
                    <button type="button" @click="removeCon(index)" class="px-3 py-2 text-red-600 hover:text-red-800">
                      Remove
                    </button>
                  </div>
                  <button type="button" @click="addCon" class="text-blue-600 hover:text-blue-800">
                    + Add Con
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Review Sections -->
          <div class="mt-8 space-y-6">
            <h2 class="text-xl font-semibold mb-4">Review Sections</h2>

            <!-- Design Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Design & Build</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea v-model="review.sections.design.content" rows="3"
                    class="w-full px-3 py-2 border rounded-md"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Images</label>
                  <div class="grid grid-cols-3 gap-4">
                    <div v-for="(image, index) in designImages" :key="index" class="relative">
                      <img v-if="image.preview" :src="image.preview" class="w-full h-32 object-cover rounded-lg">
                      <div v-else class="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span class="text-gray-500">No image</span>
                      </div>
                      <input type="file" @change="handleDesignImageUpload($event, index)"
                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Display Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Display</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea v-model="review.sections.display.content" rows="3"
                    class="w-full px-3 py-2 border rounded-md"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Specifications</label>
                  <div class="space-y-4">
                    <div v-for="(value, key) in review.sections.display.specs" :key="key"
                      class="grid grid-cols-2 gap-4">
                      <input v-model="displaySpecKeys[key]" type="text" placeholder="Key"
                        class="px-3 py-2 border rounded-md">
                      <div class="flex gap-2">
                        <input v-model="review.sections.display.specs[key]" type="text" placeholder="Value"
                          class="flex-1 px-3 py-2 border rounded-md">
                        <button type="button" @click="removeDisplaySpec(key)"
                          class="px-3 py-2 text-red-600 hover:text-red-800">
                          Remove
                        </button>
                      </div>
                    </div>
                    <button type="button" @click="addDisplaySpec" class="text-blue-600 hover:text-blue-800">
                      + Add Specification
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add more sections as needed -->
          </div>

          <!-- Retailers -->
          <div class="mt-8 space-y-6">
            <h2 class="text-xl font-semibold mb-4">Where to Buy</h2>
            <div class="space-y-4">
              <div v-for="(retailer, index) in retailers" :key="index" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input v-model="retailer.name" type="text" placeholder="Retailer Name"
                  class="px-3 py-2 border rounded-md">
                <input v-model.number="retailer.price" type="number" placeholder="Price"
                  class="px-3 py-2 border rounded-md">
                <div class="flex gap-2">
                  <input v-model="retailer.link" type="url" placeholder="Product Link"
                    class="flex-1 px-3 py-2 border rounded-md">
                  <button type="button" @click="removeRetailer(index)"
                    class="px-3 py-2 text-red-600 hover:text-red-800">
                    Remove
                  </button>
                </div>
              </div>
              <button type="button" @click="addRetailer" class="text-blue-600 hover:text-blue-800">
                + Add Retailer
              </button>
            </div>
          </div>

          <!-- Final Verdict -->
          <div class="mt-8">
            <label class="block text-sm font-medium text-gray-700 mb-2">Final Verdict</label>
            <textarea v-model="review.verdict" required rows="4" class="w-full px-3 py-2 border rounded-md"></textarea>
          </div>

          <!-- Image Upload Section -->
          <div class="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 class="text-2xl font-bold mb-6">Review Images</h2>

            <!-- Upload Progress -->
            <div v-if="uploadingImages" class="mb-4">
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  :style="{ width: `${uploadProgress}%` }"></div>
              </div>
              <p class="text-sm text-gray-600 mt-2">Uploading... {{ uploadProgress }}%</p>
            </div>

            <!-- Uploaded Images -->
            <div v-if="uploadedImages.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div v-for="(image, index) in uploadedImages" :key="index" class="relative group">
                <img :src="image.url" :alt="`Review image ${index + 1}`" class="w-full h-48 object-cover rounded-lg">
                <div
                  class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button @click="removeImage(index)" class="text-white hover:text-red-500">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <span class="text-sm text-gray-600 mt-1 block">{{ image.section }}</span>
              </div>
            </div>

            <!-- Upload Buttons -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Design Images</label>
                <input type="file" accept="image/*" @change="(e) => handleImageUpload(e, 'design')" class="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Display Images</label>
                <input type="file" accept="image/*" @change="(e) => handleImageUpload(e, 'display')" class="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100">
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-8">
            <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
              :disabled="isSubmitting">
              {{ isSubmitting ? 'Saving...' : 'Save Review' }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  slug: string;
}

const { data: categoriesData } = await useFetch('/api/categories')
const categories = ref(categoriesData.value || [])

const review = ref({
  title: '',
  category_id: '',
  content: '',
  excerpt: '',
  rating: 0,
  quick_summary: {},
  pros: [''],
  cons: [''],
  sections: {
    design: {
      content: '',
      images: []
    },
    display: {
      content: '',
      specs: {}
    }
  },
  verdict: '',
  is_featured: false,
  featured_image_url: '',
  featured_image_public_id: ''
})

const retailers = ref([])
const designImages = ref([])
const summaryKeys = ref({})
const displaySpecKeys = ref({})
const isSubmitting = ref(false)

// Image upload state
const uploadingImages = ref(false)
const uploadProgress = ref(0)
const uploadedImages = ref<Array<{ url: string; public_id: string; section: string }>>([])

const isUploading = ref(false)
const uploadStatus = ref(null)
const featuredImageInput = ref(null)

const triggerFeaturedImageUpload = () => featuredImageInput.value?.click()

const handleFeaturedImageUpload = async (event) => {
  const input = event.target
  if (!input.files?.length) return

  try {
    isUploading.value = true
    uploadStatus.value = null
    const file = input.files[0]
    if (file.size > 10 * 1024 * 1024) {
      uploadStatus.value = { type: 'error', message: 'File too large. Please select an image under 10MB.' }
      return
    }
    if (!file.type.startsWith('image/')) {
      uploadStatus.value = { type: 'error', message: 'Please select a valid image file.' }
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await response.json()
    if (!response.ok) {
      uploadStatus.value = { type: 'error', message: data.message || 'Failed to upload image. Please try again.' }
      return
    }
    if (data) {
      review.value.featured_image_url = data.url
      review.value.featured_image_public_id = data.public_id
      uploadStatus.value = { type: 'success', message: 'Image uploaded successfully!' }
    } else {
      uploadStatus.value = { type: 'error', message: 'No data received from upload service.' }
    }
  } catch (error) {
    uploadStatus.value = { type: 'error', message: 'Error uploading image. Please try again.' }
  } finally {
    isUploading.value = false
    input.value = ''
  }
}

const removeFeaturedImage = () => {
  review.value.featured_image_url = ''
  review.value.featured_image_public_id = ''
}

// Helper functions for managing arrays
const addPro = () => review.value.pros.push('')
const removePro = (index) => review.value.pros.splice(index, 1)
const addCon = () => review.value.cons.push('')
const removeCon = (index) => review.value.cons.splice(index, 1)
const addRetailer = () => retailers.value.push({ name: '', price: 0, link: '' })
const removeRetailer = (index) => retailers.value.splice(index, 1)

// Helper functions for managing objects
const addSummaryItem = () => {
  const key = `key_${Object.keys(review.value.quick_summary).length}`
  summaryKeys.value[key] = ''
  review.value.quick_summary[key] = ''
}

const removeSummaryItem = (key) => {
  delete summaryKeys.value[key]
  delete review.value.quick_summary[key]
}

const addDisplaySpec = () => {
  const key = `key_${Object.keys(review.value.sections.display.specs).length}`
  displaySpecKeys.value[key] = ''
  review.value.sections.display.specs[key] = ''
}

const removeDisplaySpec = (key) => {
  delete displaySpecKeys.value[key]
  delete review.value.sections.display.specs[key]
}

// Handle image uploads
const handleDesignImageUpload = async (event, index) => {
  const file = event.target.files[0]
  if (!file) return

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    designImages.value[index] = {
      file,
      preview: e.target.result
    }
  }
  reader.readAsDataURL(file)
}

// Handle image upload (for review images, not featured)
const handleImageUpload = async (event: Event, section: string) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  uploadingImages.value = true
  uploadProgress.value = 0

  try {
    const file = input.files[0]
    const formData = new FormData()
    formData.append('file', file)
    // Remove upload_preset if not needed by your backend

    // Use native fetch for file upload
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Failed to upload image. Please try again.')
    }
    if (data) {
      uploadedImages.value.push({
        url: data.url,
        public_id: data.public_id,
        section
      })
    }
  } catch (error) {
    console.error('Error uploading image:', error)
  } finally {
    uploadingImages.value = false
    uploadProgress.value = 0
    input.value = '' // Reset input
  }
}

// Remove uploaded image
const removeImage = (index: number) => {
  uploadedImages.value.splice(index, 1)
}

// Handle form submission
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const slug = review.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const response = await $fetch('/api/reviews', {
      method: 'POST',
      body: {
        ...review.value,
        slug,
        retailers: retailers.value,
        images: uploadedImages.value
      }
    });

    if (!response) {
      throw new Error('Failed to save review');
    }

    navigateTo(`/reviews/${response.slug}`);
  } catch (error) {
    alert('Error saving review. Please try again.');
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>