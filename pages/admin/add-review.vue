<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />
    <main class="py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8 text-green-700 flex items-center gap-2 
            justify-center sm:justify-start text-center sm:text-left">
          <svg class="w-7 h-7 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
            <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
          Add New Review
        </h1>

        <form @submit.prevent="handleSubmit" class="max-w-4xl mx-auto space-y-4">
          <!-- Basic Information -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <button type="button" @click="toggleSection('basic')" 
              class="w-full px-6 py-4 text-left bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-150 transition-all duration-200 flex items-center justify-between border-b border-green-200">
              <h2 class="text-xl font-semibold text-green-700">Basic Information</h2>
              <span class="text-sm text-green-600 bg-green-200 px-2 py-1 rounded-full">Required</span>
              <svg :class="[openSections.basic ? 'rotate-180' : '', 'w-5 h-5 text-green-600 transition-transform duration-200']" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="openSections.basic" class="p-6 space-y-6">
              <div class="text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <strong>📝 Quick Start:</strong> Fill in the basic details about your review - title, category, rating, and content.
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input v-model="review.title" type="text" required class="w-full px-3 py-2 border rounded-md">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select v-model="review.category_id" required
                    class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="" disabled>Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                  <p class="mt-1 text-sm text-gray-500">Choose the device category for this review</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                  <input v-model.number="review.rating" type="number" min="0" max="5" step="0.1" required
                    class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                  <input v-model="review.brand" type="text" required class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Featured Review</label>
                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input v-model="review.is_featured" type="checkbox" class="rounded border-gray-300 text-green-600 focus:ring-green-500">
                    <span class="ml-2">Mark as featured</span>
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea v-model="review.excerpt" required rows="3"
                  class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea v-model="review.content" required rows="6"
                  class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
              </div>
            </div>
          </div>

          <!-- Featured Image -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <button type="button" @click="toggleSection('image')" 
              class="w-full px-6 py-4 text-left bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-150 transition-all duration-200 flex items-center justify-between border-b border-blue-200">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 class="text-xl font-semibold text-blue-700">Featured Image</h2>
                <span class="text-sm text-blue-600 bg-blue-200 px-2 py-1 rounded-full">Optional</span>
              </div>
              <svg :class="[openSections.image ? 'rotate-180' : '', 'w-5 h-5 text-blue-600 transition-transform duration-200']" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="openSections.image" class="p-6">
              <div class="text-sm text-gray-600 mb-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <strong>🖼️ Tip:</strong> Add a high-quality featured image to make your review more engaging.
              </div>
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
          </div>

          <!-- Quick Summary -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <button type="button" @click="toggleSection('summary')" 
              class="w-full px-6 py-4 text-left bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-150 transition-all duration-200 flex items-center justify-between border-b border-purple-200">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 class="text-xl font-semibold text-purple-700">Quick Summary</h2>
                <span class="text-sm text-purple-600 bg-purple-200 px-2 py-1 rounded-full">Optional</span>
              </div>
              <svg :class="[openSections.summary ? 'rotate-180' : '', 'w-5 h-5 text-purple-600 transition-transform duration-200']" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="openSections.summary" class="p-6">
              <div class="text-sm text-gray-600 mb-4 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <strong>📊 Quick Facts:</strong> Add key specifications and features for easy reference.
              </div>
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
              <button type="button" @click="addSummaryItem" class="text-purple-600 hover:text-purple-800">
                + Add Summary Item
              </button>
              </div>
            </div>
          </div>

          <!-- Pros and Cons -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <button type="button" @click="toggleSection('proscons')" 
              class="w-full px-6 py-4 text-left bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-150 transition-all duration-200 flex items-center justify-between border-b border-orange-200">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 class="text-xl font-semibold text-orange-700">Pros and Cons</h2>
                <span class="text-sm text-orange-600 bg-orange-200 px-2 py-1 rounded-full">Recommended</span>
              </div>
              <svg :class="[openSections.proscons ? 'rotate-180' : '', 'w-5 h-5 text-orange-600 transition-transform duration-200']" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="openSections.proscons" class="p-6">
              <div class="text-sm text-gray-600 mb-4 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <strong>⚖️ Balance:</strong> List the strengths and weaknesses to help readers make informed decisions.
              </div>
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
                  <button type="button" @click="addCon" class="text-orange-600 hover:text-orange-800">
                    + Add Con
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>

          <!-- Review Sections -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <button type="button" @click="toggleSection('specifications')" 
              class="w-full px-6 py-4 text-left bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-150 transition-all duration-200 flex items-center justify-between border-b border-indigo-200">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 class="text-xl font-semibold text-indigo-700">Review Specifications</h2>
                <span class="text-sm text-indigo-600 bg-indigo-200 px-2 py-1 rounded-full">Optional</span>
              </div>
              <svg :class="[openSections.specifications ? 'rotate-180' : '', 'w-5 h-5 text-indigo-600 transition-transform duration-200']" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="openSections.specifications" class="p-6 space-y-4">
              <div class="text-sm text-gray-600 mb-4 p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                <strong>🔧 Technical Details:</strong> Add detailed specifications for each component category.
              </div>
            </div>

            <!-- Design & Build Section -->
            <div class="border rounded-lg overflow-hidden">
              <button type="button" @click="toggleSection('design')" 
                class="w-full px-4 py-3 text-left bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 transition-all duration-200 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <h3 class="font-medium text-gray-700">Design & Build</h3>
                </div>
                <svg :class="[openSections.design ? 'rotate-180' : '', 'w-4 h-4 text-gray-600 transition-transform duration-200']" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="openSections.design" class="p-4">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Frame Material</label>
                  <input v-model="review.sections.design.frame" type="text"
                    placeholder="e.g. Aluminum, Plastic, Wood, Titanium" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Glass Type</label>
                  <input v-model="review.sections.design.glass" type="text"
                    placeholder="e.g. Gorilla Glass Victus, Sapphire, None" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
                  <input v-model="review.sections.design.body" type="text"
                    placeholder="e.g. Unibody, Foldable, Slider, Bar" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Other Design Features</label>
                  <input v-model="review.sections.design.other" type="text"
                    placeholder="e.g. IP68, MIL-STD-810H, Removable back" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                  <input v-model="review.sections.design.weight" type="text" placeholder="e.g. 180g, 7.8mm"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Images</label>
                  <div class="grid grid-cols-3 gap-4">
                    <div v-for="(image, index) in designImages" :key="index" class="relative">
                      <img v-if="image.preview" :src="typeof image.preview === 'string' ? image.preview : ''"
                        class="w-full h-32 object-cover rounded-lg">
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
            </div>
            

            <!-- Display Section -->
            <div class="border rounded-lg overflow-hidden">
              <button type="button" @click="toggleSection('display')" 
                class="w-full px-4 py-3 text-left bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 transition-all duration-200 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h3 class="font-medium text-gray-700">Display</h3>
                </div>
                <svg :class="[openSections.display ? 'rotate-180' : '', 'w-4 h-4 text-gray-600 transition-transform duration-200']" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="openSections.display" class="p-4">
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Technology</label>
                    <input v-model="review.sections.display.technology" type="text" placeholder="e.g. AMOLED, IPS LCD"
                      class="w-full px-3 py-2 border rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
                    <input v-model="review.sections.display.resolution" type="text"
                      placeholder="e.g. 1080 x 2400 pixels" class="w-full px-3 py-2 border rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Refresh Rate</label>
                    <input v-model="review.sections.display.refresh_rate" type="text" placeholder="e.g. 120Hz"
                      class="w-full px-3 py-2 border rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Brightness</label>
                    <input v-model="review.sections.display.brightness" type="text" placeholder="e.g. 1000 nits (peak)"
                      class="w-full px-3 py-2 border rounded-md">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Protection</label>
                    <input v-model="review.sections.display.protection" type="text" placeholder="e.g. Gorilla Glass 5"
                      class="w-full px-3 py-2 border rounded-md">
                  </div>
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
                          class="px-3 py-2 text-red-600 hover:text-red-800">Remove</button>
                      </div>
                    </div>
                    <button type="button" @click="addDisplaySpec" class="text-blue-600 hover:text-blue-800">+ Add
                      Specification</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Camera Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Camera</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Rear Camera -->
                <div>
                  <h4 class="font-semibold mb-2">Rear Camera</h4>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Specs</label>
                  <input v-model="review.sections.camera.rear.specs" type="text" placeholder="e.g. 50MP + 12MP + 5MP"
                    class="w-full px-3 py-2 border rounded-md mb-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Features</label>
                  <input v-model="review.sections.camera.rear.features" type="text"
                    placeholder="e.g. OIS, LED flash, panorama" class="w-full px-3 py-2 border rounded-md mb-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Video</label>
                  <input v-model="review.sections.camera.rear.video" type="text"
                    placeholder="e.g. 4K@30fps, 1080p@60fps" class="w-full px-3 py-2 border rounded-md">
                </div>
                <!-- Front Camera -->
                <div>
                  <h4 class="font-semibold mb-2">Front Camera</h4>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Specs</label>
                  <input v-model="review.sections.camera.front.specs" type="text" placeholder="e.g. 32MP"
                    class="w-full px-3 py-2 border rounded-md mb-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Features</label>
                  <input v-model="review.sections.camera.front.features" type="text" placeholder="e.g. HDR, panorama"
                    class="w-full px-3 py-2 border rounded-md mb-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Video</label>
                  <input v-model="review.sections.camera.front.video" type="text" placeholder="e.g. 1080p@30fps"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>

            <!-- Connectivity Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Connectivity</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Network</label>
                  <input v-model="review.sections.connectivity.network" type="text"
                    placeholder="e.g. GSM / HSPA / LTE / 5G" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">WiFi</label>
                  <input v-model="review.sections.connectivity.wifi" type="text"
                    placeholder="e.g. Wi-Fi 802.11 a/b/g/n/ac/ax" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bluetooth</label>
                  <input v-model="review.sections.connectivity.bluetooth" type="text" placeholder="e.g. 5.3, A2DP, LE"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">GPS</label>
                  <input v-model="review.sections.connectivity.gps" type="text"
                    placeholder="e.g. Yes, with A-GPS, GLONASS" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">NFC</label>
                  <input v-model="review.sections.connectivity.nfc" type="text" placeholder="e.g. Yes/No"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">USB</label>
                  <input v-model="review.sections.connectivity.usb" type="text" placeholder="e.g. USB Type-C 2.0"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">SIM</label>
                  <input v-model="review.sections.connectivity.sim" type="text"
                    placeholder="e.g. Dual SIM (Nano-SIM, dual stand-by)" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Cellular</label>
                  <input v-model="review.sections.connectivity.cellular" type="text" placeholder="e.g. 4G, 5G"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Ethernet</label>
                  <input v-model="review.sections.connectivity.ethernet" type="text" placeholder="e.g. Yes/No"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>

            <!-- Storage Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Storage</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Internal Storage</label>
                  <input v-model="review.sections.storage.internal" type="text" placeholder="e.g. 128GB, 256GB"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Expandable Storage</label>
                  <input v-model="review.sections.storage.expandable" type="text"
                    placeholder="e.g. microSDXC (dedicated slot)" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Storage Type</label>
                  <input v-model="review.sections.storage.type" type="text" placeholder="e.g. SSD, HDD, UFS"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>

            <!-- Battery & Charging Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Battery & Charging</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Battery Capacity</label>
                  <input v-model="review.sections.battery.capacity" type="text" placeholder="e.g. 5000mAh"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <input v-model="review.sections.battery.type" type="text" placeholder="e.g. Li-Po, non-removable"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Charging</label>
                  <input v-model="review.sections.battery.charging" type="text" placeholder="e.g. 67W wired, PD3.0, QC4"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Wireless Charging</label>
                  <input v-model="review.sections.battery.wireless" type="text" placeholder="e.g. 50W wireless"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Battery Life</label>
                  <input v-model="review.sections.battery.life" type="text"
                    placeholder="e.g. 10 hours usage, 300h standby" class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>

            <!-- Processor/Chipset Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Processor / Chipset</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Processor / Chipset</label>
                  <input v-model="review.sections.processor.name" type="text"
                    placeholder="e.g. Snapdragon 8 Gen 2, Apple M1" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">GPU</label>
                  <input v-model="review.sections.processor.gpu" type="text"
                    placeholder="e.g. Adreno 740, Mali-G78, RTX 4060" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">RAM</label>
                  <input v-model="review.sections.processor.ram" type="text" placeholder="e.g. 8GB, 16GB DDR5"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Operating System</label>
                  <input v-model="review.sections.processor.os" type="text"
                    placeholder="e.g. Android 14, Windows 11, iOS 17" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Processor Type</label>
                  <input v-model="review.sections.processor.type" type="text" placeholder="e.g. ARM, x86, Snapdragon"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Core Count</label>
                  <input v-model="review.sections.processor.cores" type="text" placeholder="e.g. Octa-core"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Clock Speed</label>
                  <input v-model="review.sections.processor.clock" type="text" placeholder="e.g. 3.2GHz"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Architecture</label>
                  <input v-model="review.sections.processor.architecture" type="text" placeholder="e.g. 64-bit"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">RAM Type</label>
                  <input v-model="review.sections.processor.ram_type" type="text" placeholder="e.g. DDR5, LPDDR4X"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>

            <!-- Ports Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Ports</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Ports</label>
                  <input v-model="review.sections.ports.ports" type="text" placeholder="e.g. USB-C, HDMI, 3.5mm jack"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">HDMI / DisplayPort</label>
                  <input v-model="review.sections.ports.hdmi" type="text" placeholder="e.g. HDMI 2.1, DisplayPort 1.4"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Charging Port</label>
                  <input v-model="review.sections.ports.charging" type="text" placeholder="e.g. USB-C, Proprietary"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">SIM Slot / eSIM / Memory Card Slot</label>
                  <input v-model="review.sections.ports.sim" type="text" placeholder="e.g. Dual SIM, eSIM"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>

            <!-- Audio Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Audio Features</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Audio Features</label>
                  <input v-model="review.sections.audio.features" type="text"
                    placeholder="e.g. Stereo speakers, Dolby Atmos" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Speakers</label>
                  <input v-model="review.sections.audio.speakers" type="text" placeholder="e.g. Stereo, Dolby Atmos"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Microphones</label>
                  <input v-model="review.sections.audio.microphones" type="text" placeholder="e.g. Dual-array"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Audio Jack</label>
                  <input v-model="review.sections.audio.jack" type="text" placeholder="e.g. 3.5mm, None"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Codec Support</label>
                  <input v-model="review.sections.audio.codec" type="text" placeholder="e.g. AAC, LDAC, aptX"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Noise Cancellation</label>
                  <input v-model="review.sections.audio.noise_cancellation" type="text"
                    placeholder="e.g. Active, Passive" class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>

            <!-- Special Features Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Special Features</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Special Features</label>
                  <input v-model="review.sections.special_features.features" type="text"
                    placeholder="e.g. Touchscreen, RGB lighting, Water resistance"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>

            <!-- Gaming Features Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Gaming Features</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Gaming Features</label>
                  <input v-model="review.sections.gaming.features" type="text"
                    placeholder="e.g. 144Hz display, Game mode, Haptic feedback"
                    class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>
          </div>
        </div>

          <!-- Device-Specific Specifications Section -->
          <div class="mt-8 space-y-6">
            <h2 class="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              Device-Specific Specifications
            </h2>
            <!-- Laptops -->
            <div v-if="selectedCategory && selectedCategory.slug === 'laptop'"
              class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Form Factor</label>
                <input v-model="review.sections.laptop.form_factor" type="text"
                  placeholder="e.g. Ultrabook, Convertible" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Keyboard Type</label>
                <input v-model="review.sections.laptop.keyboard_type" type="text" placeholder="e.g. Backlit, Mechanical"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Trackpad / Pointer</label>
                <input v-model="review.sections.laptop.trackpad" type="text" placeholder="e.g. Precision Touchpad"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">I/O Ports</label>
                <input v-model="review.sections.laptop.io_ports" type="text" placeholder="e.g. HDMI, SD card reader"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Upgradability</label>
                <input v-model="review.sections.laptop.upgradability" type="text"
                  placeholder="e.g. RAM slots, Storage bays" class="w-full px-3 py-2 border rounded-md">
              </div>
            </div>
            <!-- Gaming Devices -->
            <div v-if="selectedCategory && selectedCategory.slug === 'gaming'"
              class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">GPU</label>
                <input v-model="review.sections.gaming.gpu" type="text" placeholder="e.g. NVIDIA RTX, AMD Radeon"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Controller Support</label>
                <input v-model="review.sections.gaming.controller_support" type="text"
                  placeholder="e.g. Wired, Wireless" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Display Modes</label>
                <input v-model="review.sections.gaming.display_modes" type="text" placeholder="e.g. 4K HDR, 120Hz"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cooling System</label>
                <input v-model="review.sections.gaming.cooling_system" type="text"
                  placeholder="e.g. Vapor chamber, Liquid metal" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Exclusive Titles / Game Store</label>
                <input v-model="review.sections.gaming.exclusive_titles" type="text"
                  placeholder="e.g. PlayStation Store" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Storage Speed</label>
                <input v-model="review.sections.gaming.storage_speed" type="text" placeholder="e.g. NVMe SSD"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">RGB Lighting</label>
                <input v-model="review.sections.gaming.rgb_lighting" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
            </div>
            <!-- Smartphones -->
            <div v-if="selectedCategory && selectedCategory.slug === 'smartphone'"
              class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Camera System</label>
                <input v-model="review.sections.smartphone.camera_system" type="text" placeholder="e.g. Triple-lens"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">SIM Setup</label>
                <input v-model="review.sections.smartphone.sim_setup" type="text" placeholder="e.g. Dual SIM, eSIM"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Display Cutouts</label>
                <input v-model="review.sections.smartphone.display_cutouts" type="text"
                  placeholder="e.g. Notch, Hole-punch" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Face Unlock / In-screen Fingerprint</label>
                <input v-model="review.sections.smartphone.face_unlock" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Mobile Chipset</label>
                <input v-model="review.sections.smartphone.mobile_chipset" type="text"
                  placeholder="e.g. Snapdragon, Exynos" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">OS Custom UI</label>
                <input v-model="review.sections.smartphone.os_custom_ui" type="text" placeholder="e.g. MIUI, One UI"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Network Bands</label>
                <input v-model="review.sections.smartphone.network_bands" type="text" placeholder="e.g. LTE, 5G SA/NSA"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
            </div>
            <!-- Audio Devices -->
            <div v-if="selectedCategory && selectedCategory.slug === 'audio-device'"
              class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Driver Size</label>
                <input v-model="review.sections.audio_device.driver_size" type="text" placeholder="e.g. 40mm"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Audio Format Support</label>
                <input v-model="review.sections.audio_device.audio_format_support" type="text"
                  placeholder="e.g. AAC, aptX, LDAC" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ANC (Active Noise Cancellation)</label>
                <input v-model="review.sections.audio_device.anc" type="text" placeholder="e.g. Hybrid, Feedforward"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Mic Array</label>
                <input v-model="review.sections.audio_device.mic_array" type="text" placeholder="e.g. Beamforming"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Battery Life per Charge + Case</label>
                <input v-model="review.sections.audio_device.battery_life_per_charge" type="text"
                  placeholder="e.g. 8h + 24h case" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Water Resistance</label>
                <input v-model="review.sections.audio_device.water_resistance" type="text" placeholder="e.g. IPX4, IPX7"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Multi-device Pairing</label>
                <input v-model="review.sections.audio_device.multipoint" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Voice Assistant Integration</label>
                <input v-model="review.sections.audio_device.voice_assistant" type="text"
                  placeholder="e.g. Google Assistant" class="w-full px-3 py-2 border rounded-md">
              </div>
            </div>
            <!-- Cameras -->
            <div v-if="selectedCategory && selectedCategory.slug === 'camera'"
              class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sensor Type</label>
                <input v-model="review.sections.camera_device.sensor_type" type="text"
                  placeholder="e.g. Full-frame, APS-C" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sensor Size</label>
                <input v-model="review.sections.camera_device.sensor_size" type="text" placeholder="e.g. 36x24mm"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Lens Mount</label>
                <input v-model="review.sections.camera_device.lens_mount" type="text"
                  placeholder="e.g. Canon EF, Sony E" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ISO Range</label>
                <input v-model="review.sections.camera_device.iso_range" type="text" placeholder="e.g. 100-51200"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Shutter Speed</label>
                <input v-model="review.sections.camera_device.shutter_speed" type="text"
                  placeholder="e.g. 1/8000s - 30s" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Autofocus System</label>
                <input v-model="review.sections.camera_device.autofocus" type="text" placeholder="e.g. Phase-detect"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Video Recording</label>
                <input v-model="review.sections.camera_device.video_recording" type="text" placeholder="e.g. 4K60, 8K"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">In-body Stabilization (IBIS)</label>
                <input v-model="review.sections.camera_device.ibis" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">External Mic / Flash Support</label>
                <input v-model="review.sections.camera_device.external_mic_flash" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
            </div>
            <!-- Accessories -->
            <div v-if="selectedCategory && selectedCategory.slug === 'accessory'"
              class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Charging Standards</label>
                <input v-model="review.sections.accessory.charging_standards" type="text"
                  placeholder="e.g. USB-PD, MagSafe" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Power Output</label>
                <input v-model="review.sections.accessory.power_output" type="text" placeholder="e.g. 65W, 100W"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Compatibility</label>
                <input v-model="review.sections.accessory.compatibility" type="text" placeholder="e.g. MFI, Cross-brand"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cable Rating</label>
                <input v-model="review.sections.accessory.cable_rating" type="text"
                  placeholder="e.g. USB 3.2, Thunderbolt" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Port Types</label>
                <input v-model="review.sections.accessory.port_types" type="text" placeholder="e.g. USB-A, HDMI"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Build Quality</label>
                <input v-model="review.sections.accessory.build_quality" type="text"
                  placeholder="e.g. Braided, Reinforced" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Latency (for input devices)</label>
                <input v-model="review.sections.accessory.latency" type="text" placeholder="e.g. 1ms"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
            </div>
            <!-- Tablets -->
            <div v-if="selectedCategory && selectedCategory.slug === 'tablet'"
              class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Pen Support</label>
                <input v-model="review.sections.tablet.pen_support" type="text" placeholder="e.g. Apple Pencil, S Pen"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Keyboard Support</label>
                <input v-model="review.sections.tablet.keyboard_support" type="text" placeholder="e.g. Smart Connector"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Use Mode</label>
                <input v-model="review.sections.tablet.use_mode" type="text"
                  placeholder="e.g. Split screen, Landscape lock" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">OS or Forks</label>
                <input v-model="review.sections.tablet.os_fork" type="text" placeholder="e.g. iPadOS, Android UI"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Display Aspect Ratio</label>
                <input v-model="review.sections.tablet.aspect_ratio" type="text" placeholder="e.g. 3:2, 16:10"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
            </div>
            <!-- Wearables -->
            <div v-if="selectedCategory && selectedCategory.slug === 'wearable'"
              class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Health Sensors</label>
                <input v-model="review.sections.wearable.health_sensors" type="text" placeholder="e.g. HR, SpO2, ECG"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sport Modes</label>
                <input v-model="review.sections.wearable.sport_modes" type="text" placeholder="e.g. Running, Swimming"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Battery Life</label>
                <input v-model="review.sections.wearable.battery_life" type="text" placeholder="e.g. 7 days"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Display Type</label>
                <input v-model="review.sections.wearable.display_type" type="text" placeholder="e.g. AMOLED, MIP"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Watch Faces & Customization</label>
                <input v-model="review.sections.wearable.watch_faces" type="text" placeholder="e.g. Customizable"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Strap Material & Size</label>
                <input v-model="review.sections.wearable.strap" type="text" placeholder="e.g. Silicone, 22mm"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Companion App Ecosystem</label>
                <input v-model="review.sections.wearable.companion_app" type="text"
                  placeholder="e.g. Apple Health, Fitbit" class="w-full px-3 py-2 border rounded-md">
              </div>
            </div>
          </div>

          <!-- Universal Specifications Section -->
          <div class="mt-8 space-y-6">
            <h2 class="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              Universal Specifications
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Battery and Power -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Battery Type</label>
                <input v-model="review.sections.battery.type" type="text" placeholder="e.g. Li-ion, Li-Po"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Battery Capacity</label>
                <input v-model="review.sections.battery.capacity" type="text" placeholder="e.g. 5000mAh, 60Wh"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Charging Speed</label>
                <input v-model="review.sections.battery.charging" type="text"
                  placeholder="e.g. Fast Charging, 67W, Wireless" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Battery Life</label>
                <input v-model="review.sections.battery.life" type="text"
                  placeholder="e.g. 10 hours usage, 300h standby" class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Processor -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Processor Type</label>
                <input v-model="review.sections.processor.type" type="text" placeholder="e.g. ARM, x86, Snapdragon"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Core Count</label>
                <input v-model="review.sections.processor.cores" type="text" placeholder="e.g. Octa-core"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Clock Speed</label>
                <input v-model="review.sections.processor.clock" type="text" placeholder="e.g. 3.2GHz"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Architecture</label>
                <input v-model="review.sections.processor.architecture" type="text" placeholder="e.g. 64-bit"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Display -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Screen Size</label>
                <input v-model="review.sections.display.size" type="text" placeholder="e.g. 6.5\"" class=" w-full px-3
                  py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Display Type</label>
                <input v-model="review.sections.display.technology" type="text" placeholder="e.g. OLED, IPS"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
                <input v-model="review.sections.display.resolution" type="text" placeholder="e.g. 1080x2400"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Refresh Rate</label>
                <input v-model="review.sections.display.refresh_rate" type="text" placeholder="e.g. 120Hz"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Touchscreen Support</label>
                <input v-model="review.sections.display.touchscreen" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Graphics -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">GPU Type</label>
                <input v-model="review.sections.graphics.type" type="text" placeholder="e.g. Integrated, Dedicated"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">GPU Brand</label>
                <input v-model="review.sections.graphics.brand" type="text" placeholder="e.g. NVIDIA, AMD"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">VR/AR Support</label>
                <input v-model="review.sections.graphics.vr_ar" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Storage -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Storage Type</label>
                <input v-model="review.sections.storage.type" type="text" placeholder="e.g. SSD, HDD, UFS"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Storage Capacity</label>
                <input v-model="review.sections.storage.internal" type="text" placeholder="e.g. 256GB, 1TB"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Expandable Storage</label>
                <input v-model="review.sections.storage.expandable" type="text" placeholder="e.g. microSD support"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- RAM -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">RAM Capacity</label>
                <input v-model="review.sections.processor.ram" type="text" placeholder="e.g. 8GB, 16GB"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">RAM Type</label>
                <input v-model="review.sections.processor.ram_type" type="text" placeholder="e.g. DDR5, LPDDR4X"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Connectivity -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Wi-Fi</label>
                <input v-model="review.sections.connectivity.wifi" type="text" placeholder="e.g. Wi-Fi 6E"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bluetooth</label>
                <input v-model="review.sections.connectivity.bluetooth" type="text" placeholder="e.g. 5.3"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cellular</label>
                <input v-model="review.sections.connectivity.cellular" type="text" placeholder="e.g. 4G, 5G"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Infrared / NFC / UWB</label>
                <input v-model="review.sections.connectivity.nfc" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">GPS</label>
                <input v-model="review.sections.connectivity.gps" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ethernet</label>
                <input v-model="review.sections.connectivity.ethernet" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">USB / Thunderbolt / Type-C /
                  Lightning</label>
                <input v-model="review.sections.ports.ports" type="text" placeholder="e.g. USB-C, Thunderbolt 4"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Audio -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Speakers</label>
                <input v-model="review.sections.audio.speakers" type="text" placeholder="e.g. Stereo, Dolby Atmos"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Microphones</label>
                <input v-model="review.sections.audio.microphones" type="text" placeholder="e.g. Dual-array"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Audio Jack</label>
                <input v-model="review.sections.audio.jack" type="text" placeholder="e.g. 3.5mm, None"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Codec Support</label>
                <input v-model="review.sections.audio.codec" type="text" placeholder="e.g. AAC, LDAC, aptX"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Noise Cancellation</label>
                <input v-model="review.sections.audio.noise_cancellation" type="text" placeholder="e.g. Active, Passive"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Camera -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Main Camera</label>
                <input v-model="review.sections.camera.rear.specs" type="text" placeholder="e.g. 50MP, f/1.8"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Front Camera</label>
                <input v-model="review.sections.camera.front.specs" type="text" placeholder="e.g. 32MP"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Video Recording</label>
                <input v-model="review.sections.camera.rear.video" type="text" placeholder="e.g. 4K, 8K"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Stabilization</label>
                <input v-model="review.sections.camera.stabilization" type="text" placeholder="e.g. OIS, EIS"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Zoom</label>
                <input v-model="review.sections.camera.zoom" type="text" placeholder="e.g. Optical, Digital"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Security -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Biometrics</label>
                <input v-model="review.sections.security.biometrics" type="text" placeholder="e.g. Fingerprint, Face ID"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Password/PIN/Pattern</label>
                <input v-model="review.sections.security.password" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">TPM / Secure Enclave</label>
                <input v-model="review.sections.security.tpm" type="text" placeholder="e.g. Yes/No"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Cooling and Thermals -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cooling Type</label>
                <input v-model="review.sections.cooling.type" type="text" placeholder="e.g. Passive, Active"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Thermal Management</label>
                <input v-model="review.sections.cooling.thermal" type="text" placeholder="e.g. Vapor chamber, Fans"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Build and Design -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <input v-model="review.sections.design.frame" type="text" placeholder="e.g. Plastic, Metal, Glass"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Form Factor</label>
                <input v-model="review.sections.design.body" type="text" placeholder="e.g. Clamshell, Foldable"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">IP Rating</label>
                <input v-model="review.sections.design.other" type="text" placeholder="e.g. IP68"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Weight & Dimensions</label>
                <input v-model="review.sections.design.weight" type="text" placeholder="e.g. 180g, 7.8mm"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Operating System -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Operating System</label>
                <input v-model="review.sections.processor.os" type="text" placeholder="e.g. Android, Windows, iOS"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Software Features -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">App Ecosystem</label>
                <input v-model="review.sections.software.ecosystem" type="text"
                  placeholder="e.g. Google Play, App Store" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">AI Enhancements</label>
                <input v-model="review.sections.software.ai" type="text"
                  placeholder="e.g. Voice Assistant, Smart Optimization" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cloud Sync/Backup</label>
                <input v-model="review.sections.software.cloud" type="text" placeholder="e.g. iCloud, Google Drive"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Customization Options</label>
                <input v-model="review.sections.software.customization" type="text" placeholder="e.g. Themes, Widgets"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Ports & Expansion -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">HDMI / DisplayPort</label>
                <input v-model="review.sections.ports.hdmi" type="text" placeholder="e.g. HDMI 2.1, DisplayPort 1.4"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Charging Port</label>
                <input v-model="review.sections.ports.charging" type="text" placeholder="e.g. USB-C, Proprietary"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">SIM Slot / eSIM / Memory Card Slot</label>
                <input v-model="review.sections.ports.sim" type="text" placeholder="e.g. Dual SIM, eSIM"
                  class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Sensors -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sensors</label>
                <input v-model="review.sections.sensors.sensors" type="text"
                  placeholder="e.g. Accelerometer, Gyroscope, Heart Rate" class="w-full px-3 py-2 border rounded-md">
              </div>
              <!-- Compatibility -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Accessories Support</label>
                <input v-model="review.sections.compatibility.accessories" type="text"
                  placeholder="e.g. Apple Pencil, S Pen" class="w-full px-3 py-2 border rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Platform Integration</label>
                <input v-model="review.sections.compatibility.platform" type="text"
                  placeholder="e.g. Apple Continuity, Samsung DeX" class="w-full px-3 py-2 border rounded-md">
              </div>
            </div>
          </div>

          <!-- Retailers -->
          <div class="mt-8 space-y-6">
            <h2 class="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              Where to Buy
            </h2>
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
            <h2 class="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
              <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              Review Images
            </h2>

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
  // icon?: string;
  slug: string;
}

const categories = ref<Category[]>([]);

// Accordion state management
const openSections = ref({
  basic: true, // Keep basic section open by default
  image: false,
  summary: false,
  proscons: false,
  specifications: false,
  // Subsections within specifications
  design: false,
  display: false,
  camera: false,
  connectivity: false,
  storage: false,
  battery: false,
  processor: false,
  audio: false,
  deviceSpecific: false,
  universal: false,
  retailers: false,
  submit: false
});

// Toggle section visibility
const toggleSection = (sectionName: string) => {
  openSections.value[sectionName] = !openSections.value[sectionName];
};

const review = ref({
  brand: '',
  title: '',
  category_id: '',
  content: '',
  excerpt: '',
  rating: 0,
  quick_summary: {} as Record<string, string>,
  pros: [''],
  cons: [''],
  sections: {
    design: {
      frame: '',
      glass: '',
      body: '',
      other: '',
      weight: '', // Added
      images: []
    },
    display: {
      technology: '',
      resolution: '',
      refresh_rate: '',
      brightness: '',
      protection: '',
      specs: {} as Record<string, string>,
      size: '', // Added
      touchscreen: '' // Added
    },
    camera: {
      front: {
        specs: '',
        features: '',
        video: ''
      },
      rear: {
        specs: '',
        features: '',
        video: ''
      },
      stabilization: '', // Added
      zoom: '' // Added
    },
    connectivity: {
      network: '',
      wifi: '',
      bluetooth: '',
      gps: '',
      nfc: '',
      usb: '',
      sim: '',
      cellular: '', // Added
      ethernet: '' // Added
    },
    storage: {
      internal: '',
      expandable: '',
      type: '' // Added
    },
    battery: {
      capacity: '',
      type: '',
      charging: '',
      wireless: '',
      life: '' // Added
    },
    processor: {
      name: '',
      gpu: '',
      ram: '',
      os: '',
      type: '', // Added
      cores: '', // Added
      clock: '', // Added
      architecture: '', // Added
      ram_type: '' // Added
    },
    ports: {
      ports: '',
      hdmi: '', // Added
      charging: '', // Added
      sim: '' // Added
    },
    audio: {
      features: '',
      speakers: '', // Added
      microphones: '', // Added
      jack: '', // Added
      codec: '', // Added
      noise_cancellation: '' // Added
    },
    special_features: {
      features: ''
    },
    gaming: {
      features: ''
    },
    graphics: {
      type: '', // Added
      brand: '', // Added
      vr_ar: '' // Added
    },
    security: {
      biometrics: '', // Added
      password: '', // Added
      tpm: '' // Added
    },
    cooling: {
      type: '', // Added
      thermal: '' // Added
    },
    software: {
      ecosystem: '', // Added
      ai: '', // Added
      cloud: '', // Added
      customization: '' // Added
    },
    sensors: {
      sensors: '' // Added
    },
    compatibility: {
      accessories: '', // Added
      platform: '' // Added
    },
    // Add device-specific fields to the data model
    laptop: {
      form_factor: '',
      keyboard_type: '',
      trackpad: '',
      io_ports: '',
      upgradability: ''
    },
    gaming: {
      features: '',
      gpu: '',
      controller_support: '',
      display_modes: '',
      cooling_system: '',
      exclusive_titles: '',
      storage_speed: '',
      rgb_lighting: ''
    },
    smartphone: {
      camera_system: '',
      sim_setup: '',
      display_cutouts: '',
      face_unlock: '',
      mobile_chipset: '',
      os_custom_ui: '',
      network_bands: ''
    },
    audio_device: {
      driver_size: '',
      audio_format_support: '',
      anc: '',
      mic_array: '',
      battery_life_per_charge: '',
      water_resistance: '',
      multipoint: '',
      voice_assistant: ''
    },
    camera_device: {
      sensor_type: '',
      sensor_size: '',
      lens_mount: '',
      iso_range: '',
      shutter_speed: '',
      autofocus: '',
      video_recording: '',
      ibis: '',
      external_mic_flash: ''
    },
    accessory: {
      charging_standards: '',
      power_output: '',
      compatibility: '',
      cable_rating: '',
      port_types: '',
      build_quality: '',
      latency: ''
    },
    tablet: {
      pen_support: '',
      keyboard_support: '',
      use_mode: '',
      os_fork: '',
      aspect_ratio: ''
    },
    wearable: {
      health_sensors: '',
      sport_modes: '',
      battery_life: '',
      display_type: '',
      watch_faces: '',
      strap: '',
      companion_app: ''
    },
  },
  verdict: '',
  is_featured: false,
  featured_image_url: '',
  featured_image_public_id: ''
})

const retailers = ref<Array<{ name: string; price: number; link: string }>>([])
const designImages = ref<Array<{ file: File; preview: string | ArrayBuffer | null }>>([])
const summaryKeys = ref<Record<string, string>>({})
const displaySpecKeys = ref<Record<string, string>>({})
const isSubmitting = ref(false)

// Image upload state
const uploadingImages = ref(false)
const uploadProgress = ref(0)
const uploadedImages = ref<Array<{ url: string; public_id: string; section: string }>>([])

const isUploading = ref(false)
const uploadStatus = ref<null | { type: string; message: string }>(null)
import { ref } from 'vue'

const featuredImageInput = ref<HTMLInputElement | null>(null)

const triggerFeaturedImageUpload = (): void => featuredImageInput.value?.click()

const handleFeaturedImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement | null
  if (!input || !input.files?.length) return

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
const removePro = (index: number) => review.value.pros.splice(index, 1)
const addCon = () => review.value.cons.push('')
const removeCon = (index: number) => review.value.cons.splice(index, 1)
const addRetailer = () => retailers.value.push({ name: '', price: 0, link: '' })
const removeRetailer = (index: number) => retailers.value.splice(index, 1)

// Helper functions for managing objects
const addSummaryItem = () => {
  const key = `key_${Object.keys(review.value.quick_summary).length}`
  summaryKeys.value[key] = ''
  review.value.quick_summary[key] = ''
}

const removeSummaryItem = (key: string) => {
  delete summaryKeys.value[key]
  delete review.value.quick_summary[key]
}

const addDisplaySpec = () => {
  const key = `key_${Object.keys(review.value.sections.display.specs).length}`
  displaySpecKeys.value[key] = ''
  review.value.sections.display.specs[key] = ''
}

const removeDisplaySpec = (key: string) => {
  delete displaySpecKeys.value[key]
  delete review.value.sections.display.specs[key]
}

// Handle image uploads
const handleDesignImageUpload = async (event: Event, index: number) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    designImages.value[index] = {
      file,
      preview: e.target?.result ?? null
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
    const slug = review.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...review.value,
        slug,
        retailers: retailers.value,
        images: uploadedImages.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to save review');
    }

    navigateTo(`/reviews/${data.slug}`);
  } catch (error) {
    alert('Error saving review. Please try again.');
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};

const selectedCategory = computed(() => {
  return categories.value.find(c => c.id === review.value.category_id) || null
})

const selectedCategoryIsSmartphone = computed(() => {
  const cat = categories.value.find(c => c.id === review.value.category_id)
  return cat && cat.slug === 'smartphone'
})

onMounted(async () => {
  try {
    const response = await fetch('/api/categories');
    const result = await response.json();
    if (result && result.data) {
      categories.value = result.data;
      console.log('Categories loaded:', categories.value);
    } else {
      console.error('Invalid categories response format:', result);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});
</script>