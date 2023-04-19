<template>
    <div class="grid h-screen grid-rows-10">
        <header class="row-span-1 flex items-center justify-between border-b-2 px-24">
            <h1 class="text-2xl">Palette App</h1>
            <h2 class="text-xs italic">by Andrea Damiani</h2>
        </header>
        <main class="row-span-8 grid grid-cols-12">
            <div class="container col-span-10 flex items-center justify-center space-x-14 pb-5 pt-10">
                <ColorCard v-for="card in openCards" :key="card" :id="card" :card-number="card" />
            </div>
            <aside class="col-span-2 border-l-2 p-8">Barra Laterale</aside>
        </main>
        <footer class="row-span-1 flex items-center justify-center space-x-4 border-t-2">
            <SignButton @click="changeCards('-')" icon="twemoji:heavy-minus-sign" />
            <SignButton @click="changeCards('+')" icon="twemoji:heavy-plus-sign" />
        </footer>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import ColorCard from "./components/ColorCard.vue";
import SignButton from "./components/SignButton.vue";

const cards = ref(1);

const openCards = useStorage("carte-aperte", cards);

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
</script>

<style scoped></style>
