<template>
    <!-- Area Card -->
    <main class="row-span-10 bg-main-area pb-5 pt-6 duration-1000 dark:bg-slate-900">
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
    <footer class="relative row-span-1 flex items-center justify-center bg-header-footer dark:bg-slate-800">
        <!-- Pulsanti Modifica Carte -->
        <div class="grid grid-cols-2 items-center justify-center gap-2">
            <!-- Pulsante Meno -->
            <div class="flex items-center justify-center">
                <SignButton v-show="openCards > 1" @click="changeCards('-')" icon="ic:round-minus" />
            </div>

            <!-- Pulsante Più -->
            <div class="flex items-center justify-center">
                <SignButton v-show="openCards < 5" @click="changeCards('+')" icon="ic:round-plus" />
            </div>
        </div>

        <!-- Pulsante Random / Selettore HSL/RGB -->
        <div class="absolute right-6 flex items-center justify-center">
            <button @click="checkConfirmation" class="text-3xl">
                <Icon v-if="openCards === 1" icon="ph:dice-one-bold" />
                <Icon v-else-if="openCards === 2" icon="ph:dice-two-bold" />
                <Icon v-else-if="openCards === 3" icon="ph:dice-three-bold" />
                <Icon v-else-if="openCards === 4" icon="ph:dice-four-bold" />
                <Icon v-else-if="openCards === 5" icon="ph:dice-five-bold" />
            </button>

            <dialog
                ref="confirmation"
                class="w-1/2 select-none space-y-8 rounded border-4 border-blue-500 text-center shadow-2xl dark:border-slate-100 dark:bg-slate-700 dark:text-white">
                <div ref="target" class="relative space-y-8 p-8">
                    <div class="space-y-6 text-2xl">
                        <p>Performing this action will reset this palette's colors and generate random ones.</p>
                        <p>Are you sure you want to continue?</p>
                    </div>
                    <div class="absolute bottom-2 flex items-center gap-1 self-center">
                        <label for="ask-again" class="text-base">Don't Ask Again</label>
                        <input type="checkbox" id="ask-again" ref="askAgain" />
                    </div>
                    <form method="dialog" class="flex justify-center gap-10 text-xl" @submit="randomColors">
                        <div class="space-x-6">
                            <BaseButton class="bg-green-700 hover:bg-green-600" type="submit">Yes</BaseButton>
                            <BaseButton class="bg-red-700 hover:bg-red-600" @click.prevent="confirmation.close()">No</BaseButton>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    </footer>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStorage, useStyleTag, onClickOutside } from "@vueuse/core";

import CardContainer from "./CardContainer.vue";
import ColorCard from "./ColorCard.vue";
import SignButton from "./SignButton.vue";
import BaseButton from "./BaseButton.vue";

const props = defineProps({
    selectedPalette: Number,
});

const askAgain = ref(null);
const confirmation = ref(null);
const target = ref(null);
const dontAskAgain = useStorage("ask-again", true);

const openCards = useStorage(`carte-aperte-palette${props.selectedPalette}`, 1);

const changeCards = sign => {
    sign === "+" ? openCards.value++ : openCards.value--;
};

const css = useStyleTag();

const checkConfirmation = () => {
    dontAskAgain.value ? randomColors() : confirmation.value.showModal();
};

onClickOutside(target, () => confirmation.value.close());

const randomColors = () => {
    dontAskAgain.value = askAgain.value.value;
    for (let i = 1; i <= 5; i++) {
        const hue = useStorage(`palette${props.selectedPalette}-card${i}-slider1`);
        const saturation = useStorage(`palette${props.selectedPalette}-card${i}-slider2`);
        const lightness = useStorage(`palette${props.selectedPalette}-card${i}-slider3`);

        hue.value = (Math.random() * (360 - 0) + 0).toFixed(1);
        saturation.value = (Math.random() * (100 - 50) + 50).toFixed(1);
        lightness.value = 50;

        watch([hue, saturation, lightness], ([newHue, newSaturation, newLightness]) => {
            css.value = useStyleTag(`#card${i} { background-color: hsl(${newHue}, ${newSaturation}%, ${newLightness}%) }`, {
                id: `id${i}`,
            });
        });
    }
};
</script>
