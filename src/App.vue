<template>
    <!-- Schermata Mobile -->
    <div
        v-if="width <= 1024 && orientation === 'portrait-primary'"
        class="flex h-screen w-screen flex-col items-center justify-center space-y-5 bg-slate-900 p-10">
        <h1 class="text-5xl">Palette App</h1>
        <h2 class="text-2xl italic">by Andrea Damiani</h2>
        <Icon icon="material-symbols:mobile-off-rounded" class="text-9xl" />
        <h2 class="text-center text-3xl">Quest'app è utilizzabile solo su uno schermo grande.</h2>
    </div>

    <!-- App Desktop -->
    <div v-else class="grid h-screen grid-cols-12">
        <!-- Schermata Principale -->
        <div class="col-span-10 grid grid-rows-10">
            <!-- Barra Titolo -->
            <header class="row-span-1 flex items-center justify-between bg-header-footer px-6 dark:bg-slate-800">
                <div class="flex w-36 flex-col drop-shadow">
                    <h1 class="text-2xl">Palette App</h1>
                    <h2 class="text-end text-xs italic">by Andrea Damiani</h2>
                </div>
                <DarkButton @click="toggleDark()" />
            </header>

            <!-- Area Palette -->
            <ThePalette v-if="selectedPalette === 1" :selected-palette="1" />
            <ThePalette v-else-if="selectedPalette === 2" :selected-palette="2" />
            <ThePalette v-else-if="selectedPalette === 3" :selected-palette="3" />
            <ThePalette v-else-if="selectedPalette === 4" :selected-palette="4" />
            <ThePalette v-else-if="selectedPalette === 5" :selected-palette="5" />
            <ThePalette v-else-if="selectedPalette === 6" :selected-palette="6" />
            <ThePalette v-else-if="selectedPalette === 7" :selected-palette="7" />
            <ThePalette v-else-if="selectedPalette === 8" :selected-palette="8" />
            <ThePalette v-else-if="selectedPalette === 9" :selected-palette="9" />
            <ThePalette v-else-if="selectedPalette === 10" :selected-palette="10" />
        </div>

        <!-- Barra Laterale -->
        <aside class="z-10 col-span-2 flex flex-col items-center space-y-2 bg-sidebar p-5 dark:bg-slate-700">
            <!-- Pulsanti Palette -->
            <div
                v-for="palette in openPalettes"
                :key="palette"
                role="button"
                @click="showPalette(palette)"
                :class="{ active: palette === selectedPalette }"
                class="relative flex h-12 w-full items-center rounded-lg bg-main-area px-6 text-lg font-medium text-buttons shadow-md hover:bg-[#EB7F00] dark:bg-slate-400 dark:text-slate-700 dark:hover:bg-slate-200">
                <p>Palette {{ palette }}</p>

                <!-- Pulsante Elimina Palette -->
                <Icon
                    v-if="palette === openPalettes && openPalettes > 1"
                    icon="ph:x-circle-bold"
                    class="absolute -right-3 -top-2 z-20 m-0 rounded-full border-0 bg-white p-0 text-2xl text-red-600 outline-none dark:bg-slate-200"
                    role="button"
                    @click="removePalette" />
            </div>

            <!-- Pulsante Aggiungi Palette -->
            <button
                v-show="paletteNumber < 10"
                @click="addPalette"
                class="flex h-12 w-full items-center justify-center rounded-lg bg-main-area shadow-md dark:bg-slate-500">
                <Icon icon="ic:round-plus" class="text-5xl text-sidebar dark:text-slate-300" />
            </button>
        </aside>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStorage, useDark, useToggle, useWindowSize, useScreenOrientation } from "@vueuse/core";

import ThePalette from "./components/ThePalette.vue";
import DarkButton from "./components/DarkButton.vue";

const paletteNumber = ref(1);

const openPalettes = useStorage("palettes-aperte", paletteNumber);
const selectedPalette = useStorage("palette-selezionata", 1);

const addPalette = () => {
    paletteNumber.value++;
    selectedPalette.value = paletteNumber.value;
};

const removePalette = () => {
    paletteNumber.value--;
};

const showPalette = palette => {
    selectedPalette.value = palette;
};

const isDark = useDark();
const toggleDark = useToggle(isDark);

const { width } = useWindowSize();
const { orientation } = useScreenOrientation();
</script>

<style scoped>
.active {
    @apply bg-selected text-main-area dark:bg-slate-300 dark:text-slate-700;
}
</style>
