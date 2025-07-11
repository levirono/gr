<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 text-2xl font-bold text-green-700">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          DeviceReviews
        </NuxtLink>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="flex items-center gap-1 text-gray-600 hover:text-green-700">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
            </svg>
            Home
          </NuxtLink>
          <NuxtLink to="/reviews" class="flex items-center gap-1 text-gray-600 hover:text-green-700">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Reviews
          </NuxtLink>
          <NuxtLink to="/categories" class="flex items-center gap-1 text-gray-600 hover:text-green-700">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h8M12 8v8" />
            </svg>
            Categories
          </NuxtLink>
          <NuxtLink to="/blog" class="flex items-center gap-1 text-gray-600 hover:text-green-700">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Blog
          </NuxtLink>
          <div class="hidden md:flex items-center ml-4 relative">
            <template v-if="user && user.username">
              <div class="relative">
                <span class="ml-4 px-4 py-2 rounded bg-green-500 text-white font-semibold cursor-pointer select-none"
                  @click="toggleLogoutMenu">
                  {{ user.username }}
                </span>
                <transition name="fade">
                  <div v-if="showLogoutMenu"
                    class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg z-50 border border-gray-100 dark:border-gray-700">
                    <button @click="logout"
                      class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b">
                      Log out
                    </button>
                  </div>
                </transition>
              </div>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login"
                class="ml-4 px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-200">
                Login</NuxtLink>
            </template>
          </div>

        </div>

        <!-- Mobile Menu Button -->
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-gray-600 hover:text-green-700">
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isMenuOpen" class="md:hidden mt-4 space-y-4">
        <NuxtLink to="/" class="flex items-center gap-1 text-gray-600 hover:text-green-700" @click="isMenuOpen = false">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
          </svg>
          Home
        </NuxtLink>
        <NuxtLink to="/reviews" class="flex items-center gap-1 text-gray-600 hover:text-green-700"
          @click="isMenuOpen = false">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Reviews
        </NuxtLink>
        <NuxtLink to="/categories" class="flex items-center gap-1 text-gray-600 hover:text-green-700"
          @click="isMenuOpen = false">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h8M12 8v8" />
          </svg>
          Categories
        </NuxtLink>
        <NuxtLink to="/blog" class="flex items-center gap-1 text-gray-600 hover:text-green-700"
          @click="isMenuOpen = false">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          Blog
        </NuxtLink>
        <NuxtLink to="/login"
          class="block px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-200 text-center"
          @click="showMobileMenu = false">Login</NuxtLink>

      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const isMenuOpen = ref(false);
const showLogoutMenu = ref(false);
const { user, logout: authLogout } = useAuth();
const router = useRouter();

function toggleLogoutMenu() {
  showLogoutMenu.value = !showLogoutMenu.value;
}

function logout() {
  authLogout();
  showLogoutMenu.value = false;
  router.push('/login');
}

</script>