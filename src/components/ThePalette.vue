<template>
    <!-- Area Card -->
    <main class="row-span-8 bg-main-area pb-5 pt-6 dark:bg-slate-900">
        <CardContainer v-if="selectedPalette === 1">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="1" />
        </CardContainer>
        <CardContainer v-else-if="selectedPalette === 2">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="2" />
        </CardContainer>
        <CardContainer v-else-if="selectedPalette === 3">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="3" />
        </CardContainer>
        <CardContainer v-else-if="selectedPalette === 4">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="4" />
        </CardContainer>
        <CardContainer v-else-if="selectedPalette === 5">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="5" />
        </CardContainer>
        <CardContainer v-else-if="selectedPalette === 6">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="6" />
        </CardContainer>
        <CardContainer v-else-if="selectedPalette === 7">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="7" />
        </CardContainer>
        <CardContainer v-else-if="selectedPalette === 8">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="8" />
        </CardContainer>
        <CardContainer v-else-if="selectedPalette === 9">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="9" />
        </CardContainer>
        <CardContainer v-else-if="selectedPalette === 10">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="10" />
        </CardContainer>
    </main>

    <!-- Barra Inferiore -->
    <footer
        class="row-span-1 grid grid-cols-2 items-center justify-center space-x-4 bg-header-footer dark:bg-slate-800">
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

import CardContainer from "./CardContainer.vue";
import ColorCard from "./ColorCard.vue";
import SignButton from "./SignButton.vue";

const props = defineProps(["selectedPalette"]);

const cards = ref(1);
const openCards = useStorage(`carte-aperte-palette${props.selectedPalette}`, cards);

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
