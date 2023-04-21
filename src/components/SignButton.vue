<template>
    <button class="group rounded text-white hover:bg-gray-300 ">
        <Icon :icon="icon" class="text-5xl text-white hover:text-[#225378] dark:hover:text-slate-800" />
    </button>
</template>

<script setup>
defineProps(["icon"]);
</script>
