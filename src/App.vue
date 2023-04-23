<template>
    <!-- Schermata Mobile -->
    <div
        v-if="width <= 1024 || orientation === 'portrait-primary'"
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
            <header class="row-span-1 flex items-center justify-between bg-[#1695A3] px-6 dark:bg-slate-800">
                <div class="flex w-36 flex-col drop-shadow">
                    <h1 class="text-2xl">Palette App</h1>
                    <h2 class="text-end text-xs italic">by Andrea Damiani</h2>
                </div>
                <DarkButton @click="toggleDark()" />
            </header>

            <!-- Area Palette -->
            <ThePalette :selected-palette="paletteSelezionata" />
        </div>

        <!-- Barra Laterale -->
        <aside class="z-10 col-span-2 flex flex-col items-center space-y-2 bg-[#225378] p-5 dark:bg-slate-700">
            <!-- Pulsanti Palette -->
            <div
                v-for="palette in openPalettes"
                :key="palette"
                role="button"
                @click="showPalette(palette)"
                :class="{ active: palette === paletteSelezionata }"
                class="relative flex h-12 w-full items-center rounded-lg bg-[#F3FFE2] px-6 text-lg font-medium text-[#225378] shadow-md hover:bg-[#EB7F00] dark:bg-slate-400 dark:text-slate-700 dark:hover:bg-slate-200">
                <p>Palette {{ palette }}</p>

                <!-- Pulsante Elimina Palette -->
                <Icon
                    v-if="palette === openPalettes && openPalettes > 1"
                    icon="ph:x-circle-bold"
                    class="absolute -right-3 -top-2 z-10 m-0 rounded-full border-0 bg-white p-0 text-2xl text-red-600 outline-none dark:bg-slate-200"
                    role="button"
                    @click="paletteNumber--" />
            </div>

            <!-- Pulsante Aggiungi Palette -->
            <button
                v-show="paletteNumber < 10"
                @click="addPalette"
                class="flex h-12 w-full items-center justify-center rounded-lg bg-[#F3FFE2] shadow-md dark:bg-slate-500">
                <Icon icon="ic:round-plus" class="text-5xl text-[#225378] dark:text-slate-300" />
            </button>
        </aside>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStorage, useDark, useToggle, useWindowSize, useScreenOrientation } from "@vueuse/core";

import ThePalette from "./components/ThePalette.vue";
import DarkButton from "./components/DarkButton.vue";

const paletteNumber = ref(1);
const openPalettes = useStorage("palettes-aperte", paletteNumber);

const addPalette = () => {
    if (paletteNumber.value === 10) {
    } else {
        paletteNumber.value++;
    }
};

const isDark = useDark();
const toggleDark = useToggle(isDark);

const { width } = useWindowSize();

const { orientation } = useScreenOrientation();

const selectedPalette = ref(1);

const showPalette = palette => {
    selectedPalette.value = palette;
};

const paletteSelezionata = ref(1);

watch(selectedPalette, value => {
    if (value) {
        paletteSelezionata.value = value;
    }
});
</script>

<style scoped>
.active {
    @apply bg-[#EB7F00] dark:bg-slate-300;
}
</style>
