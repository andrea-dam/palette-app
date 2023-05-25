<template>
    <header class="transition-colos row-span-1 flex items-center justify-between bg-header-footer px-6 duration-300 dark:bg-slate-800">
        <div class="flex w-36 flex-col drop-shadow">
            <h1 class="text-2xl">Palette App</h1>
            <h2 class="text-end text-xs italic">by Andrea Damiani</h2>
        </div>
        <DarkButton @click="toggleDark()" />
    </header>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

import DarkButton from "./DarkButton.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
