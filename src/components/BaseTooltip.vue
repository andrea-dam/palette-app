<template>
    <dialog
        ref="tooltip"
        class="absolute z-10 rounded-lg bg-main-area font-medium dark:bg-slate-500 dark:text-slate-900">
        <slot />
    </dialog>
</template>

<script setup>
import { ref } from "vue";

const tooltip = ref(null);

defineExpose({ tooltip });
</script>
