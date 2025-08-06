<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />
    <main class="py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8 text-green-700 flex items-center gap-2">
          <svg class="w-7 h-7 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
            <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
          Add New Blog Post
        </h1>

        <!-- Live Preview Toggle Button -->
        <button
          class="mb-6 px-4 py-2 bg-gradient-to-r from-green-600 via-blue-500 to-green-400 text-white rounded-lg font-bold shadow hover:scale-105 transition"
          @click="showPreview = !showPreview" type="button">
          {{ showPreview ? 'Hide' : 'Show' }} Live Preview
        </button>

        <div v-if="uploadStatus" class="mb-4 p-4 rounded-md"
          :class="uploadStatus.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700 flex items-center gap-2'">
          <svg v-if="uploadStatus.type !== 'error'" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
            stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
            <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
          {{ uploadStatus.message }}
        </div>

        <form @submit.prevent="handleSubmit" class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div class="space-y-6">
            <div>
              <label class="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
                Title
              </label>
              <input v-model="blog.title" type="text" required class="w-full px-3 py-2 border rounded-md">
            </div>

            <div>
              <label class="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
                Author
              </label>
              <input v-model="blog.author" type="text" required class="w-full px-3 py-2 border rounded-md">
            </div>

            <div>
              <label class="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
                Excerpt
              </label>
              <textarea v-model="blog.excerpt" rows="3" class="w-full px-3 py-2 border rounded-md"></textarea>
            </div>

            <div>
              <label class="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
                Featured Image
              </label>
              <div class="mt-2">
                <div v-if="blog.featured_image_url" class="relative w-full h-64 mb-4">
                  <img :src="blog.featured_image_url" alt="Featured image"
                    class="w-full h-full object-cover rounded-lg">
                  <button type="button" @click="removeFeaturedImage"
                    class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div class="flex items-center">
                  <button type="button" @click="triggerFeaturedImageUpload"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" :disabled="isUploading">
                    {{ isUploading ? 'Uploading...' : 'Select Image' }}
                  </button>
                  <span v-if="isUploading" class="ml-3 text-sm text-gray-500">Uploading your image...</span>
                  <input ref="featuredImageInput" type="file" accept="image/*" @change="handleFeaturedImageUpload"
                    class="hidden">
                </div>
              </div>
            </div>

            <div>
              <label class="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
                Content
              </label>
              <div class="border rounded-md">
                <div class="border-b p-2 bg-gray-50">
                  <button type="button" @click="insertImage"
                    class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600" :disabled="isUploading">
                    {{ isUploading ? 'Uploading...' : 'Insert Image' }}
                  </button>
                </div>
                <textarea v-model="blog.content" rows="15" class="w-full px-3 py-2" ref="contentTextarea"></textarea>
              </div>
            </div>

            <div>
              <label class="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
                Publish Options
              </label>
              <div class="flex items-center space-x-4">
                <label class="inline-flex items-center">
                  <input v-model="blog.is_published" type="checkbox" class="rounded border-gray-300">
                  <span class="ml-2">Publish immediately</span>
                </label>
                <input v-if="!blog.is_published" v-model="blog.published_at" type="datetime-local"
                  class="px-3 py-2 border rounded-md">
              </div>
            </div>
          </div>

          <div class="mt-8">
            <button type="submit" class="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
              :disabled="isSubmitting">
              {{ isSubmitting ? 'Saving...' : 'Save Blog Post' }}
            </button>
          </div>
        </form>

        <!-- Live Preview Panel -->
        <div v-if="showPreview" class="mt-12">
          <h2 class="text-2xl font-bold mb-6 text-green-700">Live Preview</h2>
          <BlogView :blog="blog" :markdown="$markdown" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
interface Blog {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url?: string;
  featured_image_public_id?: string;
  author: string;
  is_published: boolean;
  published_at?: string;
}

interface UploadStatus {
  type: 'success' | 'error';
  message: string;
}

const blog = ref<Blog>({ title: '', slug: '', content: '', excerpt: '', author: '', is_published: false })
const isSubmitting = ref(false)
const isUploading = ref(false)
const uploadStatus = ref<UploadStatus | null>(null)
const featuredImageInput = ref<HTMLInputElement | null>(null)
const contentTextarea = ref<HTMLTextAreaElement | null>(null)
const showPreview = ref(false)

// Use Nuxt's markdown parser if available, or fallback to plain text
const $markdown = (useNuxtApp() as any).$markdown as (markdown: string) => string
const previewHtml = computed(() => $markdown ? $markdown(blog.value.content) : blog.value.content)

const triggerFeaturedImageUpload = () => featuredImageInput.value?.click()

const handleFeaturedImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  try {
    isUploading.value = true
    uploadStatus.value = null

    const file = input.files[0]

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      uploadStatus.value = {
        type: 'error',
        message: 'File too large. Please select an image under 10MB.'
      }
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      uploadStatus.value = {
        type: 'error',
        message: 'Please select a valid image file.'
      }
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    console.log('Uploading file:', file.name, file.type, file.size)

    // Use native fetch for file upload
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    if (!response.ok) {
      console.error('Upload error:', data)
      uploadStatus.value = {
        type: 'error',
        message: data.message || 'Failed to upload image. Please try again.'
      }
      return
    }

    if (data) {
      console.log('Upload response:', data)
      blog.value.featured_image_url = data.url
      blog.value.featured_image_public_id = data.public_id

      uploadStatus.value = {
        type: 'success',
        message: 'Image uploaded successfully!'
      }
    } else {
      uploadStatus.value = {
        type: 'error',
        message: 'No data received from upload service.'
      }
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    uploadStatus.value = {
      type: 'error',
      message: 'Error uploading image. Please try again.'
    }
  } finally {
    isUploading.value = false
    input.value = '' // Reset input
  }
}

const removeFeaturedImage = () => {
  blog.value.featured_image_url = undefined
  blog.value.featured_image_public_id = undefined
}

const insertImage = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'

  input.onchange = async (event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    try {
      isUploading.value = true
      uploadStatus.value = null

      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        uploadStatus.value = {
          type: 'error',
          message: 'File too large. Please select an image under 10MB.'
        }
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      // Use native fetch for file upload
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (!response.ok) {
        console.error('Upload error:', data)
        uploadStatus.value = {
          type: 'error',
          message: data.message || 'Failed to upload image. Please try again.'
        }
        return
      }

      if (data) {
        const imageMarkdown = `![Image](${data.url})`
        const textarea = contentTextarea.value
        if (textarea) {
          const start = textarea.selectionStart || 0
          const end = textarea.selectionEnd || 0
          blog.value.content =
            blog.value.content.substring(0, start) +
            imageMarkdown +
            blog.value.content.substring(end)
          // Move cursor after inserted image markdown
          nextTick(() => {
            textarea.focus()
            const pos = start + imageMarkdown.length
            textarea.setSelectionRange(pos, pos)
          })
        }
        uploadStatus.value = {
          type: 'success',
          message: 'Image inserted successfully!'
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      uploadStatus.value = {
        type: 'error',
        message: 'Error uploading image. Please try again.'
      }
    } finally {
      isUploading.value = false
    }
  }

  input.click()
}

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    blog.value.slug = blog.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const { data: newBlog, error } = await useFetch('/api/blogs', {
      method: 'POST',
      body: blog.value
    })

    if (error.value) throw new Error('Failed to save blog post')
    navigateTo(`/blog/${newBlog.value.slug}`)
  } catch (error) {
    alert('Error saving blog post. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(16, 185, 129, 0.08), 0 1.5px 6px 0 rgba(59, 130, 246, 0.06);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(16, 185, 129, 0.10);
  position: relative;
  overflow: hidden;
}
</style>