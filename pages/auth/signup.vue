<template>
    <div class="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 bg-gray-50 py-16 px-4">
        <h1 class="text-4xl font-bold mb-4 dark:text-white text-gray-900">Sign Up</h1>
        <form class="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded shadow" @submit.prevent="onSignup">
            <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Username</label>
                <input v-model="username"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Your Username" required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Email</label>
                <input v-model="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="email" placeholder="Your Email" required />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Password</label>
                <div class="relative">
                    <input v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        :type="showPassword ? 'text' : 'password'" placeholder="Your Password" required />
                    <span @click="showPassword = !showPassword"
                        class="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer">
                        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2}
                                d="M13.875 18.825A6.978 6.978 0 0012 19.5c-3.313 0-6-2.686-6-6 0-.354.028-.705.085-1.05M15.362 15.362A4.992 4.992 0 0018 12c0-1.657-.672-3.157-1.762-4.238m-1.876 9.6A4.992 4.992 0 0012 18c-1.657 0-3.157-.672-4.238-1.762M8.625 8.625A4.992 4.992 0 006 12c0 1.657.672 3.157 1.762 4.238M16.125 7.875A6.978 6.978 0 0012 4.5c-3.313 0-6 2.686-6 6 0 .354.028.705.085 1.05" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2}
                                d="M13.875 18.825A6.978 6.978 0 0012 19.5c-3.313 0-6-2.686-6-6 0-.354.028-.705.085-1.05M16.125 7.875A6.978 6.978 0 0012 4.5c-3.313 0-6 2.686-6 6 0 .354.028.705.085 1.05M8.625 8.625A4.992 4.992 0 006 12c0 1.657.672 3.157 1.762 4.238m1.876-9.6A4.992 4.992 0 0012 6c1.657 0 3.157.672 4.238 1.762M18 12c0 1.657-.672 3.157-1.762 4.238m-1.876-9.6A4.992 4.992 0 0012 6c-1.657 0-3.157.672-4.238 1.762" />
                        </svg>
                    </span>
                </div>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Confirm Password</label>
                <input v-model="confirmPassword"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    :type="showPassword ? 'text' : 'password'" placeholder="Confirm Your Password" required />
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Sign Up
                </button>
                <NuxtLink to="/auth/login" class="text-blue-500 hover:underline ml-4">Login</NuxtLink>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const email = ref('');
const password = ref('');
const username = ref('');
const showPassword = ref(false);
const confirmPassword = ref('');
const router = useRouter();
const { setUser } = useAuth();

const onSignup = async () => {
    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match.');
        return;
    }
    try {
        const response = await $fetch('/api/auth/signup', {
            method: 'POST',
            body: { email: email.value, password: password.value, username: username.value }
        });
        if (response && 'error' in response && response.error) {
            alert(response.error);
        } else if (response && 'user' in response && response.user) {
            try {
                await $fetch('/api/users', {
                    method: 'POST',
                    body: {
                        id: response.user.id,
                        email: response.user.email,
                        username: username.value,
                        role: 'user'
                    }
                });
            } catch (userErr) {
                // Optionally log or alert userErr for debugging
                console.error('User table insert error:', userErr);
            }
            setUser({ username: username.value, email: email.value, role: 'user' });
            alert('Signup successful! Please check your email to confirm your account.');
            router.push('/');
        }
    } catch (err) {
        alert('Signup failed.');
    }
};
</script>
