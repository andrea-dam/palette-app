<template>
    <div class="grid h-screen grid-cols-12">
        <div class="col-span-10 grid grid-rows-10">
            <header class="row-span-1 flex items-center justify-between border-b-2 px-24">
                <h1 class="text-2xl">Palette App</h1>
                <h2 class="text-xs italic">by Andrea Damiani</h2>
            </header>
            <main class="row-span-8 flex items-center justify-center pb-5 pt-6 lg:space-x-2">
                <ColorCard v-for="card in openCards" :key="card" :id="card" :card-number="card" />
            </main>
            <footer class="row-span-1 flex items-center justify-center space-x-4 border-t-2">
                <SignButton @click="changeCards('-')" icon="twemoji:heavy-minus-sign" />
                <SignButton @click="changeCards('+')" icon="twemoji:heavy-plus-sign" />
            </footer>
        </div>
        <aside class="col-span-2 flex flex-col items-center space-y-2 border-l-2 p-5">
            <div v-for="palette in openPalettes" :key="palette" class="h-12 w-full rounded-lg border-2"></div>
            <button
                v-show="paletteNumber < 10"
                @click="addPalette"
                class="flex h-12 w-full items-center justify-center rounded-lg border-2">
                <Icon icon="twemoji:heavy-plus-sign" class="text-4xl" />
            </button>
        </aside>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import ColorCard from "./components/ColorCard.vue";
import SignButton from "./components/SignButton.vue";

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
</script>

<style scoped></style>
