<template>
    <div class="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 bg-gray-50 py-16 px-4">
        <h1 class="text-4xl font-bold mb-4 dark:text-white text-gray-900">Login</h1>
        <form class="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded shadow" @submit.prevent="onLogin">
            <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Email</label>
                <input v-model="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="email" placeholder="Your Email" required />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Username</label>
                <input v-model="username"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" placeholder="Your Username (optional)" />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Password</label>
                <div class="relative">
                    <input :type="showPassword ? 'text' : 'password'" v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your Password" required />
                    <button type="button" @click="showPassword = !showPassword"
                        class="absolute right-2 top-2 text-gray-500 dark:text-gray-300">
                        {{ showPassword ? 'Hide' : 'Show' }}
                    </button>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Login
                </button>
                <NuxtLink to="/auth/signup" class="text-blue-500 hover:underline ml-4">Sign Up</NuxtLink>
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
const router = useRouter();
const { setUser } = useAuth();

const onLogin = async () => {
    try {
        const response = await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email: email.value, password: password.value, username: username.value }
        });
        if (response && response.error) {
            alert(response.error);
        } else if (response && response.user) {
            // Fetch user role from users table
            const userId = response.user.id;
            const userDetails = await $fetch(`/api/users?user_id=${userId}`);
            let role = 'user';
            if (userDetails && userDetails.length > 0 && userDetails[0].role) {
                role = userDetails[0].role;
            }
            setUser({
                email: response.user.email,
                username: response.user.user_metadata?.username || response.user.email,
                role
            });
            alert('Login successful!');
            await router.push('/');
        }
    } catch (err) {
        alert('Login failed.');
    }
};
</script>
