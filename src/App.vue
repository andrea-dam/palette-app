<template>
    <!-- Schermata Mobile -->
    <div
        v-if="(width <= 1024 && orientation === 'portrait-primary') || (width <= 1024 && orientation === 'landscape-primary')"
        class="flex h-screen w-screen flex-col items-center justify-center space-y-5 bg-slate-900 p-10">
        <h1 class="text-5xl">Palette App</h1>
        <h2 class="text-2xl italic">by Andrea Damiani</h2>
        <Icon icon="material-symbols:mobile-off-rounded" class="text-9xl" />
        <h2 class="text-center text-3xl">This App may only be used on a large screen.</h2>
    </div>

    <!-- App Desktop -->
    <div v-else class="grid h-screen grid-cols-12">
        <!-- Schermata Principale -->
        <div class="col-span-10 grid grid-rows-12">
            <!-- Barra Titolo -->
            <TheHeader />

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
        <aside
            class="z-10 col-span-2 flex flex-col items-center justify-between bg-sidebar p-5 transition-colors duration-1000 dark:bg-slate-700">
            <div class="w-full space-y-2">
                <!-- Pulsanti Palette -->
                <div
                    v-for="(palette, index) in palettes"
                    :key="index"
                    role="button"
                    @click="showPalette(index)"
                    :class="{ active: index === selectedPalette }"
                    class="group relative flex h-12 w-full items-center justify-between rounded-lg bg-main-area px-6 text-lg font-medium text-buttons shadow-md hover:bg-[#EB7F00] dark:bg-slate-400 dark:text-slate-700 dark:hover:bg-slate-200">
                    <!-- Nome Palette/Campo Input -->
                    <form v-if="palette.isBeingEdited" @submit.prevent="palette.isBeingEdited = false">
                        <input
                            type="text"
                            v-model.lazy="palette.name"
                            class="w-full"
                            maxlength="10"
                            spellcheck="false"
                            @blur="palette.isBeingEdited = false"
                            required />
                    </form>
                    <p v-else>{{ palette.name }}</p>

                    <!-- Pulsante Rinomina -->
                    <Icon
                        icon="material-symbols:edit-square-outline"
                        class="z-20 hidden text-buttons group-hover:block group-hover:bg-transparent"
                        role="button"
                        inline="true"
                        v-if="!palette.isBeingEdited"
                        @click="updateName(index)"
                        :class="{ active: palette === selectedPalette }" />

                    <!-- Pulsante Elimina Palette -->
                    <Icon
                        v-if="palettes.length > 1"
                        icon="ph:x-circle-bold"
                        class="absolute -right-3 -top-2 z-20 m-0 hidden rounded-full border-0 bg-white p-0 text-2xl text-red-600 outline-none group-hover:block dark:bg-slate-200"
                        role="button"
                        @click="removePalette(index)" />
                </div>

                <!-- Pulsante Aggiungi Palette -->
                <button
                    v-show="palettes.length < 10"
                    @click="addPalette"
                    class="flex h-12 w-full items-center justify-center rounded-lg bg-main-area shadow-md dark:bg-slate-500">
                    <Icon icon="ic:round-plus" class="text-5xl text-sidebar dark:text-slate-300" />
                </button>
            </div>

            <a href="https://andrea-dam.gitlab.io/tailwind-colors/" target="_blank" class="flex items-center gap-2 text-xl italic"
                >Tailwind Colors<Icon icon="tabler:external-link"
            /></a>
        </aside>
    </div>
</template>

<script setup>
import { useStorage, useWindowSize, useScreenOrientation } from "@vueuse/core";

import TheHeader from "./components/TheHeader.vue";
import ColorPalette from "./components/ColorPalette.vue";

const selectedPalette = useStorage("palette-selezionata", 1);

const palettes = useStorage("palette-names", [{ name: "Palette 1", isBeingEdited: false }]);

const addPalette = () => {
    let counter = palettes.value.length;
    counter++;
    palettes.value.push({ name: `Palette ${counter}`, isBeingEdited: false });
    selectedPalette.value = counter - 1;
};

const removePalette = index => {
    let counter = palettes.value.length;
    counter--;
    palettes.value.splice(index, 1);
    selectedPalette.value = counter - 1;
};

const showPalette = palette => {
    selectedPalette.value = palette;
};

const updateName = palette => {
    palettes.value[palette].isBeingEdited = true;
};

const { width } = useWindowSize();
const { orientation } = useScreenOrientation();
</script>

<style>
.active {
    @apply bg-selected text-main-area dark:bg-slate-300 dark:text-slate-700;
}
</style>
