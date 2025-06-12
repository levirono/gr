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
          Add New Review
        </h1>

        <form @submit.prevent="handleSubmit" class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <!-- Basic Information -->
          <div class="space-y-6">
            <h2 class="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              Basic Information
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input v-model="review.title" type="text" required class="w-full px-3 py-2 border rounded-md">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select v-model="review.category_id" required
                  class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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

            <!-- New Brand Name Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
              <input v-model="review.brand" type="text" required class="w-full px-3 py-2 border rounded-md">
            </div>
          </div>

          <!-- Featured Image -->
          <div class="mt-8 space-y-6">
            <h2 class="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              Featured Image
            </h2>
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
            <h2 class="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              Quick Summary
            </h2>
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
            <h2 class="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              Pros and Cons
            </h2>
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
            <h2 class="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              Review Sections
            </h2>

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

            <!-- Display Section -->
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-4">Display</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea v-model="review.sections.display.content" rows="3"
                    class="w-full px-3 py-2 border rounded-md"></textarea>
                </div>
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
      content: '',
      images: []
    },
    display: {
      content: '',
      technology: '',
      resolution: '',
      refresh_rate: '',
      brightness: '',
      protection: '',
      specs: {} as Record<string, string>
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
      }
    },
    connectivity: {
      network: '',
      wifi: '',
      bluetooth: '',
      gps: '',
      nfc: '',
      usb: '',
      sim: ''
    },
    storage: {
      internal: '',
      expandable: ''
    },
    battery: {
      capacity: '',
      type: '',
      charging: '',
      wireless: ''
    },
    processor: {
      name: '',
      gpu: '',
      ram: '',
      os: ''
    },
    ports: {
      ports: ''
    },
    audio: {
      features: ''
    },
    special_features: {
      features: ''
    },
    gaming: {
      features: ''
    }
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