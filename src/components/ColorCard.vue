<template>
    <div class="group relative flex h-full w-48 flex-col space-y-1">
        <!-- Card Colore -->
        <div :id="`card${cardNumber}`" class="h-full rounded drop-shadow-xl dark:drop-shadow-none"></div>

        <!-- Sezione Slider -->
        <div>
            <ColorSlider
                :palette-number="props.selectedPalette"
                :card-number="cardNumber"
                :sliderNumber="1"
                attributo="H"
                @update-value="value => (hue = value)"
                :max="360" />
            <ColorSlider
                :palette-number="props.selectedPalette"
                :card-number="cardNumber"
                :sliderNumber="2"
                attributo="S"
                @update-value="value => (saturation = value)"
                :max="100" />
            <ColorSlider
                :palette-number="props.selectedPalette"
                :card-number="cardNumber"
                :sliderNumber="3"
                attributo="L"
                @update-value="value => (lightness = value)"
                :max="100" />
        </div>

        <!-- Pulsante Copia -->
        <button
            @click="copy(result)"
            class="absolute right-2 top-2 hidden h-10 w-10 items-center justify-center rounded bg-main-area/90 text-3xl text-sidebar shadow group-hover:flex dark:bg-slate-500 dark:text-slate-200">
            <Icon v-if="!copied" icon="mdi:clipboard-multiple-outline" />
            <Icon v-else icon="mdi:clipboard-check-multiple-outline" />
        </button>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStyleTag, useStorage, useClipboard } from "@vueuse/core";
import ColorSlider from "../components/ColorSlider.vue";

const props = defineProps({
    cardNumber: Number,
    selectedPalette: Number,
});

const hue = useStorage(`palette${props.selectedPalette}-card${props.cardNumber}-slider1`, (Math.random() * (360 - 0) + 0).toFixed(1));

const saturation = useStorage(
    `palette${props.selectedPalette}-card${props.cardNumber}-slider2`,
    (Math.random() * (100 - 50) + 50).toFixed(1)
);
let saturationPercentage = `${saturation.value}%`;

const lightness = useStorage(`palette${props.selectedPalette}-card${props.cardNumber}-slider3`, 50);
let lightnessPercentage = `${lightness.value}%`;

const css = useStyleTag(`#card${props.cardNumber} { background-color: hsl(${hue.value}, ${saturation.value}%, ${lightness.value}%) }`, {
    id: `id${props.cardNumber}`,
});

watch(hue, newValue => {
    if (newValue) {
        css.value = useStyleTag(
            `#card${props.cardNumber} { background-color: hsl(${newValue}, ${saturationPercentage}, ${lightnessPercentage}) }`,
            {
                id: `id${props.cardNumber}`,
            }
        );
    }
});
watch(saturation, newValue => {
    if (newValue) {
        saturationPercentage = `${newValue}%`;
        css.value = useStyleTag(
            `#card${props.cardNumber} { background-color: hsl(${hue.value}, ${saturationPercentage}, ${lightnessPercentage}) }`,
            {
                id: `id${props.cardNumber}`,
            }
        );
    }
});
watch(lightness, newValue => {
    if (newValue) {
        lightnessPercentage = `${newValue}%`;
        css.value = useStyleTag(
            `#card${props.cardNumber} { background-color: hsl(${hue.value}, ${saturationPercentage}, ${lightnessPercentage}) }`,
            {
                id: `id${props.cardNumber}`,
            }
        );
    }
});

const result = ref(`hsl(${hue.value}, ${saturationPercentage}, ${lightnessPercentage})`);

const { copy, copied } = useClipboard({ result });
</script>
