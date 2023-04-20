<template>
    <div class="flex h-full w-48 flex-col">
        <div :id="`card${cardNumber}`" class="h-full rounded border-2"></div>
        <div>
            <ColorSlider :card-number="cardNumber" sliderNumber="1" attributo="H" @update-value="n => (hue = n)" max="360" />
            <ColorSlider :card-number="cardNumber" sliderNumber="2" attributo="S" @update-value="n => (saturation = n)" max="100" />
            <ColorSlider :card-number="cardNumber" sliderNumber="3" attributo="L" @update-value="n => (lightness = n)" max="100" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStyleTag } from "@vueuse/core";
import ColorSlider from "../components/ColorSlider.vue";

const props = defineProps(["cardNumber"]);

const hue = ref(128);
const saturation = ref(50);
let saturationPercentage = `${saturation.value}%`;
const lightness = ref(50);
let lightnessPercentage = `${lightness.value}%`;

const css = useStyleTag(
    `#card${props.cardNumber} { background-color: hsl(${hue.value}, ${saturationPercentage}, ${lightnessPercentage}) }`,
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
