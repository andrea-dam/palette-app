<template>
    <button class="group rounded text-main-area hover:bg-main-area">
        <Icon :icon="icon" class="text-4xl text-main-area hover:text-header-footer dark:hover:text-slate-800" />
    </button>
</template>

<script setup>
defineProps({
    icon: String,
});
</script>
