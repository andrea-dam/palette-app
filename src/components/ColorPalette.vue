<template>
    <!-- Area Card -->
    <main class="row-span-8 bg-main-area pb-5 pt-6 duration-1000 dark:bg-slate-900">
        <CardContainer v-if="selectedPalette === 1">
            <ColorCard v-for="card in openCards" :key="card" :card-number="card" :selected-palette="1" :convert-to-rgb="isRGB" />
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
    <footer class="row-span-1 flex items-center justify-between bg-header-footer px-6 dark:bg-slate-800">
        <!-- Nome Palette Selezionata -->
        <h3>{{ name }}</h3>

        <!-- Pulsanti Modifica Carte -->
        <div class="grid grid-cols-2 items-center gap-2">
            <!-- Pulsante Meno -->
            <div>
                <SignButton v-show="openCards > 1" @click="changeCards('-')" icon="ic:round-minus" />
            </div>

            <!-- Pulsante Più -->
            <div>
                <SignButton v-show="openCards < 5" @click="changeCards('+')" icon="ic:round-plus" />
            </div>
        </div>

        <!-- Selettore HSL/RGB -->
        <div class="flex content-end items-center space-x-4">
            <p>HSL</p>
            <input
                class="checked:bg-primary checked:after:bg-primary checked:focus:border-primary checked:focus:bg-primary dark:checked:bg-primary dark:checked:after:bg-primary mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                type="checkbox"
                role="switch"
                @click="toggleRGB()"
                :checked="isRGB" />
            <p>RGB</p>
        </div>
    </footer>
</template>

<script setup>
import { ref } from "vue";
import { useStorage, useToggle } from "@vueuse/core";

import CardContainer from "./CardContainer.vue";
import ColorCard from "./ColorCard.vue";
import SignButton from "./SignButton.vue";

const props = defineProps({
    selectedPalette: Number,
    name: String,
});

const isRGB = ref(false);
const toggleRGB = useToggle(isRGB);

const openCards = useStorage(`carte-aperte-palette${props.selectedPalette}`, 1);

const changeCards = sign => {
    sign === "+" ? openCards.value++ : openCards.value--;
};
</script>
