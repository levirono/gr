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
          Admin Dashboard
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NuxtLink to="/admin/add-review" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 class="text-xl font-semibold text-green-700 mb-2">Add Review</h2>
            <p class="text-gray-600">Create a new device review for the site.</p>
          </NuxtLink>
          <NuxtLink to="/admin/add-blog" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 class="text-xl font-semibold text-green-700 mb-2">Add Blog</h2>
            <p class="text-gray-600">Write and publish a new blog post.</p>
          </NuxtLink>
          <NuxtLink to="/admin/users" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 class="text-xl font-semibold text-green-700 mb-2">View Users</h2>
            <p class="text-gray-600">See and manage all registered users.</p>
          </NuxtLink>
          <!-- Add more admin functions here as needed -->
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Authentication temporarily disabled for testing
// import { useAuth } from '~/composables/useAuth';
// import { useRouter } from 'vue-router';
// import { onMounted } from 'vue';

// interface User {
//   role: string;
//   // add other properties as needed
// }

// const { user } = useAuth() as { user: Ref<User | null> };
// const router = useRouter();

// onMounted(() => {
//   if (!user.value || user.value.role !== 'admin') {
//     router.push('/');
//   }
// });
</script>
