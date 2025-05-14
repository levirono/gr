<template>
    <div class="min-h-screen">
      <TheHeader />
      <main>
        <!-- Hero Section -->
        <section class="bg-gray-50 py-16">
          <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold mb-4">About DeviceReview</h1>
            <p class="text-xl text-gray-600">Your trusted source for honest and detailed device reviews</p>
          </div>
        </section>
  
        <!-- Mission Section -->
        <section class="py-16">
          <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto">
              <h2 class="text-3xl font-bold mb-6">Our Mission</h2>
              <p class="text-gray-600 mb-8">
                At DeviceReview, we're committed to providing honest, thorough, and unbiased reviews 
                of the latest technology devices. Our team of experts tests each device extensively 
                to help you make informed purchasing decisions.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center">
                  <div class="text-4xl mb-4">🎯</div>
                  <h3 class="font-semibold mb-2">Honest Reviews</h3>
                  <p class="text-gray-600">No bias, just facts and real experiences</p>
                </div>
                <div class="text-center">
                  <div class="text-4xl mb-4">🔍</div>
                  <h3 class="font-semibold mb-2">Deep Analysis</h3>
                  <p class="text-gray-600">Thorough testing and detailed comparisons</p>
                </div>
                <div class="text-center">
                  <div class="text-4xl mb-4">⚡</div>
                  <h3 class="font-semibold mb-2">Latest Tech</h3>
                  <p class="text-gray-600">Up-to-date with the newest releases</p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Team Section -->
        <section class="py-16 bg-gray-50">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold mb-8 text-center">Our Team</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div v-for="member in team" :key="member.name" class="bg-white rounded-lg shadow-md p-6 text-center">
                <div class="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 class="font-semibold mb-1">{{ member.name }}</h3>
                <p class="text-gray-600 mb-2">{{ member.role }}</p>
                <p class="text-sm text-gray-500">{{ member.bio }}</p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Contact Section -->
        <section class="py-16">
          <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto text-center">
              <h2 class="text-3xl font-bold mb-6">Get in Touch</h2>
              <p class="text-gray-600 mb-8">
                Have questions or suggestions? We'd love to hear from you!
              </p>
              <div class="space-y-4">
                <p class="text-gray-600">📧 Email: contact@devicereview.com</p>
                <p class="text-gray-600">📱 Phone: (555) 123-4567</p>
                <p class="text-gray-600">📍 Location: Tech Valley, CA 94025</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <TheFooter />
    </div>
  </template>
  
  <script setup>
  const team = [
    {
      name: 'John Smith',
      role: 'Lead Reviewer',
      bio: '10+ years experience in tech reviews and analysis'
    },
    {
      name: 'Sarah Johnson',
      role: 'Mobile Tech Expert',
      bio: 'Specializes in smartphone and tablet reviews'
    },
    {
      name: 'Mike Chen',
      role: 'Audio Specialist',
      bio: 'Expert in audio equipment and wearable technology'
    }
  ]
  </script>