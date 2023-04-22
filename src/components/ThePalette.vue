<template>
    <main class="row-span-8 bg-[#F3FFE2] pb-5 pt-6 dark:bg-slate-900">
        <div v-if="selectedPalette === 1" class="card-container">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="selectedPalette" />
        </div>
        <div v-else-if="selectedPalette === 2" class="card-container">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="selectedPalette" />
        </div>
        <div v-else-if="selectedPalette === 3" class="card-container">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="selectedPalette" />
        </div>
        <div v-else-if="selectedPalette === 4" class="card-container">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="selectedPalette" />
        </div>
        <div v-else-if="selectedPalette === 5" class="card-container">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="selectedPalette" />
        </div>
        <div v-else-if="selectedPalette === 6" class="card-container">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="selectedPalette" />
        </div>
        <div v-else-if="selectedPalette === 7" class="card-container">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="selectedPalette" />
        </div>
        <div v-else-if="selectedPalette === 8" class="card-container">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="selectedPalette" />
        </div>
        <div v-else-if="selectedPalette === 9" class="card-container">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="selectedPalette" />
        </div>
        <div v-else-if="selectedPalette === 10" class="card-container">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="selectedPalette" />
        </div>
    </main>
    <footer class="row-span-1 grid grid-cols-2 items-center justify-center space-x-4 bg-[#1695A3] dark:bg-slate-800">
        <div class="flex items-center justify-end space-x-2">
            <SignButton v-show="cards > 1" @click="changeCards('-')" icon="ic:round-minus" />
        </div>
        <div class="flex items-center space-x-2">
            <SignButton v-show="cards < 5" @click="changeCards('+')" icon="ic:round-plus" />
        </div>
    </footer>
</template>

<script setup>
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import ColorCard from "./ColorCard.vue";
import SignButton from "./SignButton.vue";

const props = defineProps(["selectedPalette"]);

const cards = ref(1);
const openCards = useStorage(`carteaperte`, cards);

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

<style scoped>
.card-container {
    @apply flex h-full items-center justify-center xl:space-x-4 2xl:space-x-10;
}
</style>
