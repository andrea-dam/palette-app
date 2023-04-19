<template>
    <div class="flex h-full w-48 flex-col">
        <div
            class="h-full rounded border-2"
            :style="{ backgroundColor: `hsl(${hue}, ${saturation}, ${lightness})` }"></div>
        <div>
            <ColorSlider :card-number="cardNumber" sliderNumber="1" attributo="H" @parameter="setHue" />
            <ColorSlider :card-number="cardNumber" sliderNumber="2" attributo="S" @parameter="setSaturation" />
            <ColorSlider :card-number="cardNumber" sliderNumber="3" attributo="L" @parameter="setLightness" />
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import ColorSlider from "../components/ColorSlider.vue";

const props = defineProps(["cardNumber"]);

const hue = ref(128);
const saturation = ref(128);
const lightness = ref(128);

const setHue = value => {
    hue.value = value;
};
const setSaturation = value => {
    saturation.value = value;
};
const setLightness = value => {
    lightness.value = value;
};

// const theme = computed(() => {
//     return `background: hsl(${hue.value}, ${saturation.value}, ${lightness.value})`;
// });
</script>
