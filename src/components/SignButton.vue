<template>
    <button class="rounded p-1 text-white hover:bg-gray-300">
        <Icon :icon="icon" class="text-5xl text-white" />
    </button>
</template>

<script setup>
defineProps(["icon"]);
</script>
