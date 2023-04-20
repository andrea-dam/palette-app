<template>
    <div class="relative flex h-full w-48 flex-col">
        <div :id="`card${cardNumber}`" class="h-full rounded border-2 drop-shadow-sm"></div>
        <div>
            <ColorSlider :card-number="cardNumber" sliderNumber="1" attributo="H" @update-value="value => (hue = value)" max="360" />
            <ColorSlider :card-number="cardNumber" sliderNumber="2" attributo="S" @update-value="value => (saturation = value)" max="100" />
            <ColorSlider :card-number="cardNumber" sliderNumber="3" attributo="L" @update-value="value => (lightness = value)" max="100" />
        </div>
        <div class="absolute right-5 top-5 h-12 w-12 rounded bg-gray-500">
            <Icon icon="mdi:clipboard-multiple-outline" class="text-3xl text-gray-500" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStyleTag, useStorage, useClipboard } from "@vueuse/core";
import ColorSlider from "../components/ColorSlider.vue";

const props = defineProps(["cardNumber"]);

const hue = ref(180);
const saturation = ref(50);
let saturationPercentage = `${saturation.value}%`;
const lightness = ref(50);
let lightnessPercentage = `${lightness.value}%`;

const storedHue = useStorage(`card${props.cardNumber}` + "slider1", 180);
const storedSaturation = useStorage(`card${props.cardNumber}` + "slider2", 50);
const storedLightness = useStorage(`card${props.cardNumber}` + "slider3", 50);

const css = useStyleTag(
    `#card${props.cardNumber} { background-color: hsl(${storedHue.value}, ${storedSaturation.value}%, ${storedLightness.value}%) }`,
    {
        id: `id${props.cardNumber}`,
    }
);

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
</script>
