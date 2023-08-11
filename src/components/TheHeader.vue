<template>
    <header class="transition-colos flex items-center justify-between bg-header-footer px-6 duration-300 dark:bg-slate-800">
        <div class="flex w-36 flex-col drop-shadow">
            <h1 class="text-2xl">Palette App</h1>
            <h2 class="text-end text-xs italic">by Andrea Damiani</h2>
        </div>
        <DarkButton />
    </header>
</template>

<script setup>
import DarkButton from "./DarkButton.vue";
</script>
