<template>
    <div class="grid h-screen grid-cols-12">
        <div class="col-span-10 grid grid-rows-10">
            <header class="row-span-1 flex items-center justify-between bg-blue-500 px-6 dark:bg-slate-800">
                <div class="flex w-32 flex-col drop-shadow">
                    <h1 class="text-2xl">Palette App</h1>
                    <h2 class="text-end text-xs italic">by Andrea Damiani</h2>
                </div>
                <DarkButton @click="toggleDark()" />
            </header>
            <main class="row-span-8 flex items-center justify-center bg-slate-50 pb-5 pt-6 dark:bg-slate-900 lg:space-x-10">
                <ColorCard v-for="card in openCards" :key="card" :card-number="card" />
            </main>
            <footer class="row-span-1 grid grid-cols-2 items-center justify-center space-x-4 bg-blue-500 dark:bg-slate-800">
                <div class="flex items-center justify-end space-x-2">
                    <h4 v-show="cards > 1">Remove Card</h4>
                    <SignButton v-show="cards > 1" @click="changeCards('-')" icon="ic:round-minus" />
                </div>
                <div class="flex items-center space-x-2">
                    <SignButton v-show="cards < 5" @click="changeCards('+')" icon="ic:round-plus" />
                    <h4 v-show="cards < 5">Add Card</h4>
                </div>
            </footer>
        </div>
        <aside class="z-10 col-span-2 flex flex-col items-center space-y-2 bg-blue-600 p-5 dark:bg-slate-700">
            <div
                v-for="palette in openPalettes"
                :key="palette"
                class="relative flex h-12 w-full items-center rounded-lg bg-white px-6 text-lg font-medium text-blue-700 shadow-md dark:bg-slate-500 dark:text-slate-100">
                <p>Palette {{ palette }}</p>
                <Icon
                    v-if="palette === openPalettes && openPalettes > 1"
                    icon="ph:x-circle-bold"
                    class="absolute -right-2 -top-2 z-10 m-0 rounded-full border-0 bg-white p-0 text-2xl text-red-600 outline-none dark:bg-slate-200"
                    role="button"
                    @click="paletteNumber--" />
            </div>
            <button
                v-show="paletteNumber < 10"
                @click="addPalette"
                class="flex h-12 w-full items-center justify-center rounded-lg bg-white shadow-md dark:bg-slate-500">
                <Icon icon="ic:round-plus" class="text-5xl text-blue-700 dark:text-slate-300" />
            </button>
        </aside>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStorage, useDark, useToggle } from "@vueuse/core";
import ColorCard from "./components/ColorCard.vue";
import SignButton from "./components/SignButton.vue";
import DarkButton from "./components/DarkButton.vue";

const cards = ref(1);
const paletteNumber = ref(1);

const openCards = useStorage("carte-aperte", cards);
const openPalettes = useStorage("palettes-aperte", paletteNumber);

const changeCards = sign => {
    if (sign === "+") {
        if (cards.value === 5) {
        } else {
            cards.value++;
        }
    } else {
        if (cards.value === 1) {
        } else {
            cards.value--;
        }
    }
};

const addPalette = () => {
    if (paletteNumber.value === 10) {
    } else {
        paletteNumber.value++;
    }
};

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
