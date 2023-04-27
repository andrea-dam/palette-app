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
            <header
                class="row-span-1 flex items-center justify-between bg-header-footer px-6 transition-all duration-300 dark:bg-slate-800">
                <div class="flex w-36 flex-col drop-shadow">
                    <h1 class="text-2xl">Palette App</h1>
                    <h2 class="text-end text-xs italic">by Andrea Damiani</h2>
                </div>
                <DarkButton @click="toggleDark()" />
            </header>

            <!-- Area Palette -->
            <ColorPalette v-if="selectedPalette === 1" :selected-palette="1" />
            <ColorPalette v-else-if="selectedPalette === 2" :selected-palette="2" />
            <ColorPalette v-else-if="selectedPalette === 3" :selected-palette="3" />
            <ColorPalette v-else-if="selectedPalette === 4" :selected-palette="4" />
            <ColorPalette v-else-if="selectedPalette === 5" :selected-palette="5" />
            <ColorPalette v-else-if="selectedPalette === 6" :selected-palette="6" />
            <ColorPalette v-else-if="selectedPalette === 7" :selected-palette="7" />
            <ColorPalette v-else-if="selectedPalette === 8" :selected-palette="8" />
            <ColorPalette v-else-if="selectedPalette === 9" :selected-palette="9" />
            <ColorPalette v-else-if="selectedPalette === 10" :selected-palette="10" />
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
                class="group relative flex h-12 w-full items-center rounded-lg bg-main-area px-6 text-lg font-medium text-buttons shadow-md hover:bg-[#EB7F00] dark:bg-slate-400 dark:text-slate-700 dark:hover:bg-slate-200">
                <!-- Nome Palette/Campo Input -->
                <input
                    v-if="paletteNames[palette - 1].isEditing"
                    type="text"
                    v-model="paletteNames[palette - 1].name"
                    class="w-full"
                    maxlength="10"
                    @keypress.enter="paletteNames[palette - 1].isEditing = false" />
                <p v-else>{{ paletteNames[palette - 1].name }}</p>

                <!-- Pulsante Rinomina -->
                <Icon
                    icon="material-symbols:edit-square-outline"
                    class="absolute right-5 z-20 hidden text-buttons group-hover:block"
                    role="button"
                    v-if="!paletteNames[palette - 1].isEditing"
                    @click="updateName(palette)"
                    :class="{ active: palette === selectedPalette }" />

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

import ColorPalette from "./components/ColorPalette.vue";
import DarkButton from "./components/DarkButton.vue";

const paletteNumber = ref(1);

const paletteNames = useStorage("palette-names", [
    { name: "Palette 1", isEditing: false },
    { name: "Palette 2", isEditing: false },
    { name: "Palette 3", isEditing: false },
    { name: "Palette 4", isEditing: false },
    { name: "Palette 5", isEditing: false },
    { name: "Palette 6", isEditing: false },
    { name: "Palette 7", isEditing: false },
    { name: "Palette 8", isEditing: false },
    { name: "Palette 9", isEditing: false },
    { name: "Palette 10", isEditing: false },
]);

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

const updateName = palette => {
    paletteNames.value[palette - 1].isEditing = !paletteNames.value[palette - 1].isEditing;
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
