<template>
  <div class="min-h-screen bg-gray-50">
    <TheHeader />

    <!-- Image Gallery Modal -->
    <ImageGalleryModal :show="showGalleryModal" :images="review?.processedImages || []" :startIndex="galleryStartIndex"
      @close="showGalleryModal = false" />

    <main class="py-8">
      <div class="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <!-- Main Content -->
        <div class="flex-1 min-w-0">
          <!-- Loading State -->
          <div v-if="pending" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
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
                <NuxtLink to="/" class="text-green-600 hover:underline">Home</NuxtLink>
                <span class="text-gray-400">/</span>
                <NuxtLink to="/reviews" class="text-green-600 hover:underline">Reviews</NuxtLink>
                <span class="text-gray-400">/</span>
                <span class="text-gray-600">{{ review.title }}</span>
              </div>
            </div>

            <!-- Hero Section -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div class="relative h-96">
                <template v-if="review.featured_image_url">
                  <img :src="review.featured_image_url" :alt="review.title"
                    class="w-full h-full object-contain cursor-pointer" @click="openGallery(0)">
                </template>
                <template v-else>
                  <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                  </div>
                </template>
              </div>
              <!-- Thumbnails Gallery -->
              <div v-if="review.processedImages && review.processedImages.length > 1"
                class="flex gap-2 p-4 overflow-x-auto">
                <img v-for="(img, idx) in review.processedImages" :key="img" :src="img" :alt="`Image ${idx + 1}`"
                  class="h-16 w-16 object-cover rounded cursor-pointer border-2 border-transparent hover:border-green-500 transition"
                  @click="openGallery(idx)" />
              </div>
              <div class="p-8">
                <div class="flex items-center gap-4 mb-4">
                  <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {{ review.category?.name }}
                  </span>
                  <span class="text-gray-500 text-sm">{{ formatDate(review.created_at) }}</span>
                </div>
                <h1 class="text-4xl text-green-700 font-bold mb-2">{{ review.title }}</h1>
                <div class="text-lg text-gray-700 mb-2" v-if="review.brand">
                  <span class="font-semibold">Brand:</span> {{ review.brand }}
                </div>
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
            <!-- Quick Summary -->
            <div v-if="review.quick_summary" class="bg-green-50 rounded-2xl shadow p-8 mb-12 border border-green-100">
              <h2 class="text-2xl font-bold mb-6 text-green-600 flex items-center gap-2">
                <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
                </svg>
                Quick Summary
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="(value, key) in review.quick_summary" :key="key"
                  class="flex flex-col bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                  <span class="text-green-700 text-sm capitalize font-semibold">{{ formatKeyName(typeof key === 'string'
                    ?
                    key :
                    String(key)) }}</span>
                  <span class="font-medium text-gray-900 text-lg">{{ value }}</span>
                </div>
              </div>
            </div>

            <!-- Main Review Content -->
            <div v-if="review.content" class="bg-white rounded-2xl shadow-xl p-10 mb-12 border border-green-200">
              <h2 class="text-2xl font-bold mb-6 text-green-600 flex items-center gap-2">
                <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" />
                  <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
                Review Content
              </h2>
              <div class="prose max-w-none text-lg text-gray-800" v-html="review.content"></div>
            </div>

            <!-- Device Specs Section -->
            <div class="bg-white rounded-2xl shadow-xl p-10 mb-12 border border-green-200">
              <h2 class="text-3xl font-extrabold mb-8 text-green-600 tracking-tight flex items-center gap-2">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M7 7h.01M7 11h.01M7 15h.01M3 21h18M3 3h18" />
                </svg>
                Device Specifications
              </h2>
              <div class="overflow-x-auto rounded-xl border border-green-100 shadow-sm">
                <table class="min-w-full bg-white text-base text-gray-800 border border-green-200">
                  <thead class="bg-green-50">
                    <tr>
                      <th
                        class="px-8 py-4 text-left text-sm font-bold text-green-700 uppercase tracking-wider border-b border-green-200 border-r">
                        Category</th>
                      <th
                        class="px-8 py-4 text-left text-sm font-bold text-green-700 uppercase tracking-wider border-b border-green-200">
                        Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Design & Build -->
                    <template
                      v-if="review.sections?.design && (review.sections.design.frame || review.sections.design.glass || review.sections.design.body || review.sections.design.other)">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Design & Build</td>
                        <td class="px-8 py-6">
                          <div v-if="review.sections.design.frame" class="flex mb-2"><span
                              class="font-semibold w-40">Frame:</span> <span>{{ review.sections.design.frame }}</span>
                          </div>
                          <div v-if="review.sections.design.glass" class="flex mb-2"><span
                              class="font-semibold w-40">Glass:</span> <span>{{ review.sections.design.glass }}</span>
                          </div>
                          <div v-if="review.sections.design.body" class="flex mb-2"><span
                              class="font-semibold w-40">Body:</span> <span>{{ review.sections.design.body }}</span>
                          </div>
                          <div v-if="review.sections.design.other" class="flex mb-2"><span
                              class="font-semibold w-40">Other:</span> <span>{{ review.sections.design.other }}</span>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <!-- Display -->
                    <template
                      v-if="review.sections?.display && (review.sections.display.technology || review.sections.display.resolution || review.sections.display.refresh_rate || review.sections.display.brightness || review.sections.display.protection || (review.sections.display.specs && Object.keys(review.sections.display.specs).length > 0))">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Display</td>
                        <td class="px-8 py-6">
                          <div v-if="review.sections.display.technology" class="flex mb-2"><span
                              class="font-semibold w-40">Technology:</span> <span>{{ review.sections.display.technology
                              }}</span></div>
                          <div v-if="review.sections.display.resolution" class="flex mb-2"><span
                              class="font-semibold w-40">Resolution:</span> <span>{{ review.sections.display.resolution
                              }}</span></div>
                          <div v-if="review.sections.display.refresh_rate" class="flex mb-2"><span
                              class="font-semibold w-40">Refresh Rate:</span> <span>{{
                                review.sections.display.refresh_rate }}</span></div>
                          <div v-if="review.sections.display.brightness" class="flex mb-2"><span
                              class="font-semibold w-40">Brightness:</span> <span>{{ review.sections.display.brightness
                              }}</span></div>
                          <div v-if="review.sections.display.protection" class="flex mb-2"><span
                              class="font-semibold w-40">Protection:</span> <span>{{ review.sections.display.protection
                              }}</span></div>
                          <div
                            v-if="review.sections.display.specs && Object.keys(review.sections.display.specs).length > 0">
                            <div v-for="(val, key) in review.sections.display.specs" :key="key" class="flex mb-2"><span
                                class="font-semibold w-40">{{ formatKeyName(String(key)) }}:</span> <span>{{ val }}</span></div>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <!-- Camera -->
                    <template
                      v-if="review.sections?.camera && (review.sections.camera.front?.specs || review.sections.camera.front?.features || review.sections.camera.front?.video || review.sections.camera.rear?.specs || review.sections.camera.rear?.features || review.sections.camera.rear?.video)">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Camera</td>
                        <td class="px-8 py-6">
                          <div class="flex flex-col md:flex-row gap-8">
                            <div class="flex-1"
                              v-if="review.sections.camera.rear?.specs || review.sections.camera.rear?.features || review.sections.camera.rear?.video">
                              <div class="font-semibold text-green-400 mb-1">Rear</div>
                              <div v-if="review.sections.camera.rear?.specs" class="flex mb-1"><span
                                  class="font-semibold w-28">Specs:</span> <span>{{ review.sections.camera.rear.specs
                                  }}</span></div>
                              <div v-if="review.sections.camera.rear?.features" class="flex mb-1"><span
                                  class="font-semibold w-28">Features:</span> <span>{{
                                    review.sections.camera.rear.features }}</span></div>
                              <div v-if="review.sections.camera.rear?.video" class="flex mb-1"><span
                                  class="font-semibold w-28">Video:</span> <span>{{ review.sections.camera.rear.video
                                  }}</span></div>
                            </div>
                            <div class="flex-1"
                              v-if="review.sections.camera.front?.specs || review.sections.camera.front?.features || review.sections.camera.front?.video">
                              <div class="font-semibold text-green-400 mb-1">Front</div>
                              <div v-if="review.sections.camera.front?.specs" class="flex mb-1"><span
                                  class="font-semibold w-28">Specs:</span> <span>{{ review.sections.camera.front.specs
                                  }}</span></div>
                              <div v-if="review.sections.camera.front?.features" class="flex mb-1"><span
                                  class="font-semibold w-28">Features:</span> <span>{{
                                    review.sections.camera.front.features }}</span></div>
                              <div v-if="review.sections.camera.front?.video" class="flex mb-1"><span
                                  class="font-semibold w-28">Video:</span> <span>{{ review.sections.camera.front.video
                                  }}</span></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <!-- Connectivity -->
                    <template
                      v-if="review.sections?.connectivity && (review.sections.connectivity.network || review.sections.connectivity.wifi || review.sections.connectivity.bluetooth || review.sections.connectivity.gps || review.sections.connectivity.nfc || review.sections.connectivity.usb || review.sections.connectivity.sim)">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Connectivity</td>
                        <td class="px-8 py-6">
                          <div v-if="review.sections.connectivity.network" class="flex mb-2"><span
                              class="font-semibold w-40">Network:</span> <span>{{ review.sections.connectivity.network
                              }}</span></div>
                          <div v-if="review.sections.connectivity.wifi" class="flex mb-2"><span
                              class="font-semibold w-40">WiFi:</span> <span>{{ review.sections.connectivity.wifi
                              }}</span></div>
                          <div v-if="review.sections.connectivity.bluetooth" class="flex mb-2"><span
                              class="font-semibold w-40">Bluetooth:</span> <span>{{
                                review.sections.connectivity.bluetooth }}</span></div>
                          <div v-if="review.sections.connectivity.gps" class="flex mb-2"><span
                              class="font-semibold w-40">GPS:</span> <span>{{ review.sections.connectivity.gps }}</span>
                          </div>
                          <div v-if="review.sections.connectivity.nfc" class="flex mb-2"><span
                              class="font-semibold w-40">NFC:</span> <span>{{ review.sections.connectivity.nfc }}</span>
                          </div>
                          <div v-if="review.sections.connectivity.usb" class="flex mb-2"><span
                              class="font-semibold w-40">USB:</span> <span>{{ review.sections.connectivity.usb }}</span>
                          </div>
                          <div v-if="review.sections.connectivity.sim" class="flex mb-2"><span
                              class="font-semibold w-40">SIM:</span> <span>{{ review.sections.connectivity.sim }}</span>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <!-- Storage -->
                    <template
                      v-if="review.sections?.storage && (review.sections.storage.internal || review.sections.storage.expandable)">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Storage</td>
                        <td class="px-8 py-6">
                          <div v-if="review.sections.storage.internal" class="flex mb-2"><span
                              class="font-semibold w-40">Internal:</span> <span>{{ review.sections.storage.internal
                              }}</span></div>
                          <div v-if="review.sections.storage.expandable" class="flex mb-2"><span
                              class="font-semibold w-40">Expandable:</span> <span>{{ review.sections.storage.expandable
                              }}</span></div>
                        </td>
                      </tr>
                    </template>
                    <!-- Battery -->
                    <template
                      v-if="review.sections?.battery && (review.sections.battery.capacity || review.sections.battery.type || review.sections.battery.charging || review.sections.battery.wireless)">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Battery</td>
                        <td class="px-8 py-6">
                          <div v-if="review.sections.battery.capacity" class="flex mb-2"><span
                              class="font-semibold w-40">Capacity:</span> <span>{{ review.sections.battery.capacity
                              }}</span></div>
                          <div v-if="review.sections.battery.type" class="flex mb-2"><span
                              class="font-semibold w-40">Type:</span> <span>{{ review.sections.battery.type }}</span>
                          </div>
                          <div v-if="review.sections.battery.charging" class="flex mb-2"><span
                              class="font-semibold w-40">Charging:</span> <span>{{ review.sections.battery.charging
                              }}</span></div>
                          <div v-if="review.sections.battery.wireless" class="flex mb-2"><span
                              class="font-semibold w-40">Wireless Charging:</span> <span>{{
                                review.sections.battery.wireless }}</span></div>
                        </td>
                      </tr>
                    </template>
                    <!-- Processor -->
                    <template
                      v-if="review.sections?.processor && (review.sections.processor.name || review.sections.processor.gpu || review.sections.processor.ram || review.sections.processor.os)">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Processor</td>
                        <td class="px-8 py-6">
                          <div v-if="review.sections.processor.name" class="flex mb-2"><span
                              class="font-semibold w-40">Processor:</span> <span>{{ review.sections.processor.name
                              }}</span></div>
                          <div v-if="review.sections.processor.gpu" class="flex mb-2"><span
                              class="font-semibold w-40">GPU:</span> <span>{{ review.sections.processor.gpu }}</span>
                          </div>
                          <div v-if="review.sections.processor.ram" class="flex mb-2"><span
                              class="font-semibold w-40">RAM:</span> <span>{{ review.sections.processor.ram }}</span>
                          </div>
                          <div v-if="review.sections.processor.os" class="flex mb-2"><span
                              class="font-semibold w-40">Operating System:</span> <span>{{ review.sections.processor.os
                              }}</span></div>
                        </td>
                      </tr>
                    </template>
                    <!-- Ports -->
                    <template v-if="review.sections?.ports && review.sections.ports.ports">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Ports</td>
                        <td class="px-8 py-6">
                          <div class="flex mb-2"><span class="font-semibold w-40">Ports:</span> <span>{{
                            review.sections.ports.ports }}</span></div>
                        </td>
                      </tr>
                    </template>
                    <!-- Audio -->
                    <template v-if="review.sections?.audio && review.sections.audio.features">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Audio</td>
                        <td class="px-8 py-6">
                          <div class="flex mb-2"><span class="font-semibold w-40">Features:</span> <span>{{
                            review.sections.audio.features }}</span></div>
                        </td>
                      </tr>
                    </template>
                    <!-- Special Features -->
                    <template v-if="review.sections?.special_features && review.sections.special_features.features">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Special Features</td>
                        <td class="px-8 py-6">
                          <div class="flex mb-2"><span class="font-semibold w-40">Features:</span> <span>{{
                            review.sections.special_features.features }}</span></div>
                        </td>
                      </tr>
                    </template>
                    <!-- Gaming Features -->
                    <template v-if="review.sections?.gaming && review.sections.gaming.features">
                      <tr class="border-b border-green-200 hover:bg-green-50 transition">
                        <td
                          class="px-8 py-6 font-semibold text-green-700 align-top whitespace-nowrap border-r border-green-200">
                          Gaming Features</td>
                        <td class="px-8 py-6">
                          <div class="flex mb-2"><span class="font-semibold w-40">Features:</span> <span>{{
                            review.sections.gaming.features }}</span></div>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Pros and Cons -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div class="bg-green-50 rounded-2xl shadow p-8 border border-green-100">
                <h2 class="text-2xl font-bold mb-6 text-green-600 flex items-center gap-2">
                  <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Pros
                </h2>
                <ul class="space-y-4">
                  <li v-for="(pro, index) in review.pros" :key="index" class="flex items-start gap-3">
                    <span class="text-green-500 text-2xl">✓</span>
                    <span class="text-gray-900 text-lg">{{ pro }}</span>
                  </li>
                </ul>
              </div>
              <div class="bg-red-50 rounded-2xl shadow p-8 border border-red-100">
                <h2 class="text-2xl font-bold mb-6 text-red-600 flex items-center gap-2">
                  <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cons
                </h2>
                <ul class="space-y-4">
                  <li v-for="(con, index) in review.cons" :key="index" class="flex items-start gap-3">
                    <span class="text-red-500 text-2xl">×</span>
                    <span class="text-gray-900 text-lg">{{ con }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Final Verdict -->
            <div class="bg-white rounded-2xl shadow-xl p-10 mb-12 border border-green-200">
              <h2 class="text-2xl font-bold mb-6 text-green-600 flex items-center gap-2">
                <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
                </svg>
                Final Verdict
              </h2>
              <div class="prose max-w-none text-lg text-gray-800" v-html="review.verdict"></div>
            </div>

            <!-- Comments Section -->
            <div class="bg-white rounded-2xl shadow-xl p-10 border border-green-100">
              <h2 class="text-2xl font-bold mb-6 text-green-600 flex items-center gap-2">
                <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2M15 3h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2z" />
                </svg>
                Comments
              </h2>

              <!-- Comment Form -->
              <form @submit.prevent="submitComment" class="mb-8">
                <div class="mb-4">
                  <label for="name" class="block text-sm font-medium text-green-700 mb-1">Name</label>
                  <input type="text" id="name" v-model="newComment.name"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 border-green-200"
                    required>
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-sm font-medium text-green-700 mb-1">Email</label>
                  <input type="email" id="email" v-model="newComment.email"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 border-green-200"
                    required>
                </div>
                <div class="mb-4">
                  <label for="comment" class="block text-sm font-medium text-green-700 mb-1">Comment</label>
                  <textarea id="comment" v-model="newComment.content" rows="4"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 border-green-200"
                    required></textarea>
                </div>
                <button type="submit"
                  class="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-bold text-lg shadow transition"
                  :disabled="submitting">
                  {{ submitting ? 'Posting...' : 'Post Comment' }}
                </button>
              </form>

              <!-- Comments List -->
              <div v-if="comments.length > 0" class="space-y-8">
                <div v-for="comment in comments" :key="comment.id"
                  class="border-b pb-8 last:border-b-0 border-green-100">
                  <div class="flex items-center gap-4 mb-2">
                    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span class="text-green-600 font-bold text-xl">{{ comment.name.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div>
                      <h3 class="font-semibold text-green-700">{{ comment.name }}</h3>
                      <p class="text-sm text-gray-500">{{ formatDate(comment.created_at) }}</p>
                    </div>
                  </div>
                  <p class="text-gray-800 text-lg">{{ comment.content }}</p>
                </div>
              </div>
              <div v-else class="text-center py-8 text-gray-400">
                No comments yet. Be the first to comment!
              </div>
            </div>
          </div>
        </div>
        <!-- Right Sidebar -->
        <aside class="hidden lg:block w-80 flex-shrink-0">
          <div class="space-y-8">
            <!-- More from this Brand -->
            <div class="bg-white rounded-2xl shadow p-6 border border-green-100 mb-6">
              <h3 class="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 01-8 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                More from this brand
              </h3>
              <div v-if="brandReviews.length > 0">
                <div v-for="item in brandReviews" :key="item.id" class="mb-4 flex gap-3 items-center">
                  <NuxtLink :to="`/reviews/${item.slug}`" class="flex items-center gap-3 hover:underline">
                    <img v-if="item.featured_image_url" :src="item.featured_image_url" :alt="item.title"
                      class="w-14 h-14 object-contain rounded border border-green-100 bg-gray-50" />
                    <div>
                      <div class="font-semibold text-green-700">{{ item.title }}</div>
                      <div class="text-gray-500 text-xs">{{ formatDate(item.created_at) }}</div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div v-else class="text-gray-500 text-sm italic">No other devices from this brand.</div>
            </div>
            <!-- More Devices -->
            <div class="bg-white rounded-2xl shadow p-6 border border-green-100">
              <h3 class="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                More devices
              </h3>
              <div v-if="categoryDevices.length > 0">
                <div v-for="item in categoryDevices" :key="item.id" class="mb-4 flex gap-3 items-center">
                  <NuxtLink :to="`/reviews/${item.slug}`" class="flex items-center gap-3 hover:underline">
                    <img v-if="item.featured_image_url" :src="item.featured_image_url" :alt="item.title"
                      class="w-14 h-14 object-contain rounded border border-green-100 bg-gray-50" />
                    <div>
                      <div class="font-semibold text-green-700">{{ item.title }}</div>
                      <div class="text-gray-500 text-xs">{{ formatDate(item.created_at) }}</div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <div v-else class="text-gray-500 text-sm italic">No other devices in this category.</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ImageGalleryModal from '~/components/ImageGalleryModal.vue'
import { ref, onMounted } from 'vue'
import { useHead } from '#imports'

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
  category?: { name: string };
  brand?: string; // Added brand property
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
      (data.value.data || []).forEach((category: any) => {
        categories.value[category.id] = category.name;
      });
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Get category name by ID
// const getCategoryName = (categoryId: string) => {
//   return categories.value[categoryId] || 'Uncategorized';
// };

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
    if (!data) return null; // Add this null check

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
      design_images: data.images,
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
const galleryStartIndex = ref(0);

function openGallery(idx: number) {
  galleryStartIndex.value = idx;
  showGalleryModal.value = true;
}

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
    if (!response?.data) return { data: [] };
    return { data: response.data };
  }
});

comments.value = commentsData.value?.data || [];

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

// Set Open Graph and Twitter Card meta tags for social sharing
if (review.value) {
  useHead({
    title: review.value.title,
    meta: [
      { property: 'og:title', content: review.value.title },
      { property: 'og:description', content: review.value.excerpt || '' },
      { property: 'og:image', content: review.value.featured_image_url || '' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: window?.location?.href || '' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: review.value.title },
      { name: 'twitter:description', content: review.value.excerpt || '' },
      { name: 'twitter:image', content: review.value.featured_image_url || '' }
    ]
  })
}

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
      (review.value.processedImages as string[]).forEach((url, i) => {
        console.log(`  - Image ${i + 1}: ${url}`);
      });
    } else {
      console.log('❌ No processedImages found');
    }

    // Design images
    if (review.value.processedDesignImages && review.value.processedDesignImages.length > 0) {
      console.log(`✅ Processed design images (${review.value.processedDesignImages.length}):`);
      (review.value.processedDesignImages as string[]).forEach((url, i) => {
        console.log(`  - Design image ${i + 1}: ${url}`);
      });
    } else {
      console.log('❌ No processedDesignImages found');
    }

    // Display images
    if (review.value.processedDisplayImages && review.value.processedDisplayImages.length > 0) {
      console.log(`✅ Processed display images (${review.value.processedDisplayImages.length}):`);
      (review.value.processedDisplayImages as string[]).forEach((url, i) => {
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

const brandReviews = ref<Review[]>([]);
const categoryDevices = ref<Review[]>([]);

// Fetch other reviews from the same brand with the same category (excluding current review)
const fetchBrandReviews: () => Promise<void> = async () => {
  if (!review.value || !review.value.brand || !review.value.category) {
    brandReviews.value = [];
    return;
  }
  try {
    // Fetch all reviews
    const { data } = await useFetch<{ data: Review[] }>(`/api/reviews`);
    // Only include reviews with the same brand (case-insensitive), and exclude the current review
    brandReviews.value = (data.value?.data || []).filter(r => r.brand && r.brand.toLowerCase() === review.value.brand.toLowerCase() && r.slug !== review.value.slug);
  } catch (e) {
    brandReviews.value = [];
  }
};

// Fetch other devices in the same category (excluding current review), randomized
const fetchCategoryDevices = async () => {
  if (!review.value || !review.value.category_id) {
    categoryDevices.value = [];
    return;
  }
  try {
    // Fetch all reviews
    const { data } = await useFetch<{ data: Review[] }>(`/api/reviews`);
    // Only include reviews with the same category, and exclude the current review
    let filtered = (data.value?.data || []).filter(r => r.category_id === review.value.category_id && r.slug !== review.value.slug);
    // Shuffle the array for random order
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    categoryDevices.value = filtered;
  } catch (e) {
    categoryDevices.value = [];
  }
};

// Update onMounted to include fetchCategoryDevices
onMounted(() => {
  fetchCategories();
  validateImages();
  fetchBrandReviews();
  fetchCategoryDevices();
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