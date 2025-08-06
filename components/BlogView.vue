<template>
    <div class="max-w-4xl mx-auto glass-card prose prose-xl prose-green px-8 py-10 shadow-xl">
        <h1 class="text-5xl font-extrabold mb-4 text-green-700">{{ blog.title }}</h1>
        <div class="mb-4 text-gray-600">
            <span class="font-semibold">{{ blog.author }}</span>
            <span v-if="blog.published_at" class="ml-4">{{ formatDate(blog.published_at) }}</span>
        </div>
        <div v-if="blog.featured_image_url" class="mb-8">
            <img :src="blog.featured_image_url" :alt="blog.title" class="w-full rounded-2xl shadow" />
        </div>
        <div v-if="blog.excerpt" class="mb-6 italic text-xl text-gray-700">{{ blog.excerpt }}</div>
        <div v-html="contentHtml"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    blog: {
        title: string
        author: string
        published_at?: string
        featured_image_url?: string
        excerpt?: string
        content: string
    }
    markdown?: (md: string) => string
}>()

const contentHtml = computed(() =>
    props.markdown ? props.markdown(props.blog.content) : props.blog.content
)

function formatDate(date?: string) {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
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