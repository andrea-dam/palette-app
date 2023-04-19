<template>
    <div class="grid h-screen grid-rows-10">
        <header class="row-span-1 flex items-center justify-between border-b-2 px-24">
            <h1 class="text-2xl">Palette App</h1>
            <h2 class="text-xs italic">by Andrea Damiani</h2>
        </header>
        <main class="row-span-8 grid grid-cols-12">
            <div class="container col-span-10 flex items-center justify-center space-x-8 p-10 pb-5">
                <ColorCard v-for="number in numberOfCards" :key="number" :id="number" :card-number="number" />
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
import ColorCard from "./components/ColorCard.vue";
import SignButton from "./components/SignButton.vue";

const numberOfCards = ref(1);

const changeCards = sign => {
    if (sign === "+") {
        if (numberOfCards.value === 5) {
        } else {
            numberOfCards.value++;
        }
    } else {
        if (numberOfCards.value === 1) {
        } else {
            numberOfCards.value--;
        }
    }
};
</script>

<style scoped></style>
