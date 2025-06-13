<template>
    <div>
        <!-- Display Section -->
        <!-- Add your display fields here, using v-model on review and displaySpecKeys as props -->
    </div>
</template>

<script setup lang="ts">
defineProps<{ review: any, displaySpecKeys: any, addDisplaySpec: Function, removeDisplaySpec: Function }>()
</script>
