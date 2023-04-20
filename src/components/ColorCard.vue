<template>
    <div class="flex h-full w-48 flex-col">
        <div :id="`card${cardNumber}`" class="h-full rounded border-2"></div>
        <div>
            <ColorSlider :card-number="cardNumber" sliderNumber="1" attributo="H" @update-value="n => (hue = n)" />
            <ColorSlider :card-number="cardNumber" sliderNumber="2" attributo="S" @update-value="n => (saturation = n)" />
            <ColorSlider :card-number="cardNumber" sliderNumber="3" attributo="L" @update-value="n => (lightness = n)" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStyleTag } from "@vueuse/core";
import ColorSlider from "../components/ColorSlider.vue";

const props = defineProps(["cardNumber"]);

const hue = ref(128);
const saturation = ref(128);
const lightness = ref(128);

const css = useStyleTag(`#card${props.cardNumber} { background-color: rgb(${hue.value}, ${saturation.value}, ${lightness.value}) }`, {
    id: `id${props.cardNumber}`,
});

watch(hue, newValue => {
    if (newValue) {
        css.value = useStyleTag(
            `#card${props.cardNumber} { background-color: rgb(${newValue}, ${saturation.value}, ${lightness.value}) }`,
            {
                id: `id${props.cardNumber}`,
            }
        );
    }
});
watch(saturation, newValue => {
    if (newValue) {
        css.value = useStyleTag(`#card${props.cardNumber} { background-color: rgb(${hue.value}, ${newValue}, ${lightness.value}) }`, {
            id: `id${props.cardNumber}`,
        });
    }
});
watch(lightness, newValue => {
    if (newValue) {
        css.value = useStyleTag(`#card${props.cardNumber} { background-color: rgb(${hue.value}, ${saturation.value}, ${newValue}) }`, {
            id: `id${props.cardNumber}`,
        });
    }
});

// const setHue = newValue => {
//     (css.value = `#card${props.cardNumber} { background-color: rgb(${newValue}, ${saturation.value}, ${lightness.value}) }`),
//         {
//             id: `id${props.cardNumber}`,
//         };
// };
// const setSaturation = newValue => {
//     (css.value = `#card${props.cardNumber} { background-color: rgb(${hue.value}, ${newValue}, ${lightness.value}) }`),
//         {
//             id: `id${props.cardNumber}`,
//         };
// };
// const setLightness = newValue => {
//     (css.value = `#card${props.cardNumber} { background-color: rgb(${hue.value}, ${saturation.value}, ${newValue}) }`),
//         {
//             id: `id${props.cardNumber}`,
//         };
// };
</script>
