<template>
    <div class="group relative flex h-full w-48 flex-col space-y-1">
        <div :id="`card${cardNumber}`" class="h-full rounded drop-shadow-xl"></div>
        <div>
            <ColorSlider :card-number="cardNumber" sliderNumber="1" attributo="H" @update-value="value => (hue = value)" max="360" />
            <ColorSlider :card-number="cardNumber" sliderNumber="2" attributo="S" @update-value="value => (saturation = value)" max="100" />
            <ColorSlider :card-number="cardNumber" sliderNumber="3" attributo="L" @update-value="value => (lightness = value)" max="100" />
        </div>
        <button
            @click="copy(result)"
            class="absolute right-5 top-5 hidden h-10 w-10 items-center justify-center rounded bg-gray-400/70 text-white hover:bg-blue-200 hover:text-gray-900 group-hover:flex">
            <Icon v-if="!copied" icon="mdi:clipboard-multiple-outline" class="text-3xl" />
            <Icon v-else icon="mdi:clipboard-check-multiple-outline" class="text-3xl" />
        </button>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStyleTag, useStorage, useClipboard } from "@vueuse/core";
import ColorSlider from "../components/ColorSlider.vue";

const props = defineProps(["cardNumber"]);

const hue = useStorage(`card${props.cardNumber}` + "slider1", 180);

const saturation = useStorage(`card${props.cardNumber}` + "slider2", 50);
let saturationPercentage = `${saturation.value}%`;
const lightness = useStorage(`card${props.cardNumber}` + "slider3", 50);
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

console.log(result.value);

const { text, copy, copied, isSupported } = useClipboard({ result });
</script>
