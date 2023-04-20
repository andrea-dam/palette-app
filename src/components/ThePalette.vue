<template>
    <main
        class="row-span-8 flex items-center justify-center bg-slate-50 pb-5 pt-6 dark:bg-slate-900 xl:space-x-4 2xl:space-x-10">
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
</template>

<script setup>
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import ColorCard from "./ColorCard.vue";
import SignButton from "./SignButton.vue";

defineProps(["paletteId"]);

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
