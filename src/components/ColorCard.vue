<template>
    <div class="group relative flex h-full w-48 flex-col space-y-1">
        <div :id="`card${cardNumber}`" class="h-full rounded drop-shadow-xl dark:drop-shadow-none"></div>
        <div>
            <ColorSlider
                :palette-number="props.selectedPalette"
                :card-number="cardNumber"
                sliderNumber="1"
                attributo="H"
                @update-value="value => (hue = value)"
                max="360" />
            <ColorSlider
                :palette-number="props.selectedPalette"
                :card-number="cardNumber"
                sliderNumber="2"
                attributo="S"
                @update-value="value => (saturation = value)"
                max="100" />
            <ColorSlider
                :palette-number="props.selectedPalette"
                :card-number="cardNumber"
                sliderNumber="3"
                attributo="L"
                @update-value="value => (lightness = value)"
                max="100" />
        </div>
        <button
            @click="copy(result)"
            class="absolute right-2 top-2 hidden h-10 w-10 items-center justify-center rounded bg-[#F3FFE2] text-3xl text-[#225378] group-hover:flex dark:bg-slate-500 dark:text-slate-200 shadow">
            <Icon v-if="!copied" icon="mdi:clipboard-multiple-outline" />
            <Icon v-else icon="mdi:clipboard-check-multiple-outline" />
        </button>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStyleTag, useStorage, useClipboard } from "@vueuse/core";
import ColorSlider from "../components/ColorSlider.vue";

const props = defineProps(["cardNumber", "selectedPalette"]);

const hue = useStorage(`palette${props.selectedPalette}-card${props.cardNumber}-slider1`, 0);

const saturation = useStorage(`palette${props.selectedPalette}-card${props.cardNumber}-slider2`, 50);
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
