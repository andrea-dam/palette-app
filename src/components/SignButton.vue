<template>
    <button class="rounded p-1 hover:bg-gray-300">
        <Icon :icon="icon" class="text-4xl" />
    </button>
</template>

<script setup>
defineProps(["icon"]);
</script>
