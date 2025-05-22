<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-70">
        <div class="relative bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <button @click="$emit('close')"
                class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            <h2 class="text-xl font-bold mb-6">Gallery</h2>

            <!-- Loading State -->
            <div v-if="pending" class="text-center py-12">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p class="mt-4 text-gray-600">Loading images...</p>
            </div>

            <!-- Images Grid -->
            <div v-else class="grid grid-cols-2 gap-4 mb-4">
                <template v-if="parsedImages && parsedImages.length > 0">
                    <div v-for="(image, index) in parsedImages" :key="index" class="rounded-lg overflow-hidden h-64">
                        <img :src="image" :alt="`Gallery image ${index + 1}`" class="w-full h-full object-cover" />
                    </div>
                </template>
                <template v-else>
                    <div class="col-span-2 text-center text-gray-400 py-12">No images available for this reviews.</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    show: boolean;
    slug?: string
}>();
const emit = defineEmits(['close'])

// Fetch reviews data when slug is provided
const { data: reviews, pending } = await useLazyFetch(() => props.slug ? `/api/reviews/${props.slug}` : null, {
    server: false,
    default: () => null
})

// Parse images from the reviews data - extract Cloudinary URLs from JSONB
const parsedImages = computed(() => {
    if (!reviews.value?.images) return []

    let imgs = []
    const images = reviews.value.images

    if (typeof images === 'string') {
        try {
            imgs = JSON.parse(images)
        } catch (e) {
            imgs = []
        }
    } else if (Array.isArray(images)) {
        imgs = images
    } else if (typeof images === 'object') {
        imgs = extractImageUrls(images)
    }

    // Debug: log the raw images value
    console.log('ImageGalleryModal raw images value:', images)
    // If the array contains objects with a 'url' property, extract the URLs (for all items)
    if (imgs.length > 0 && typeof imgs[0] === 'object' && imgs[0].url) {
        imgs = imgs.map((img: any) => img.url)
    }

    // Remove any falsy or empty URLs
    imgs = imgs.filter(Boolean)

    // Log parsed image URLs
    console.log('ImageGalleryModal parsed images:', imgs)
    return imgs
})

// Helper function to extract image URLs from JSONB objects (same as slug logic)
function extractImageUrls(images: any): string[] {
    if (!images) return [];
    // If it's an array of objects with cloudinary_url, extract those
    if (Array.isArray(images) && images.length && images[0].cloudinary_url) {
        return images.map((img: any) => img.cloudinary_url).filter(Boolean);
    }
    // Fallback: try to extract from other possible keys
    const urls: string[] = [];
    if (Array.isArray(images)) {
        images.forEach(item => {
            if (item && typeof item === 'object') {
                ['url', 'src', 'source', 'path', 'image_url', 'cloudinary_url'].forEach(key => {
                    if (item[key] && typeof item[key] === 'string') {
                        urls.push(item[key]);
                    }
                });
            } else if (typeof item === 'string' && isValidUrl(item)) {
                urls.push(item);
            }
        });
    }
    return urls;
}

// Helper to validate URLs
function isValidUrl(str: string): boolean {
    return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/')
}
</script>

<style scoped>
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>