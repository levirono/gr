<template>
    <div>
        <!-- Quick Summary Section -->
        <!-- Add your quick summary fields here, using v-model on review and summaryKeys as props -->
    </div>
</template>

<script setup lang="ts">
defineProps<{ review: any, summaryKeys: any, addSummaryItem: Function, removeSummaryItem: Function }>()
</script>
