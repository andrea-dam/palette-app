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
import { computed, ref, watch } from "vue";
import { useStyleTag, useStorage, useClipboard } from "@vueuse/core";
import ColorSlider from "../components/ColorSlider.vue";

const props = defineProps({
    cardNumber: Number,
    selectedPalette: Number,
    convertToRgb: Boolean,
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

// Sezione Conversione

const saturationForConversion = computed(() => {
    return saturation.value / 100;
});

const c = computed(() => {
    return (1 - (lightness.value * 2 - 1)) * saturationForConversion.value;
});

const x = computed(() => {
    return c * (1 - (((H / 60) % 2) - 1));
});

const m = computed(() => {
    return lightness.value - c / 2;
});

let r1, g1, b1;

if (hue.value >= 0 && hue.value < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
} else if (hue.value >= 60 && hue.value < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
} else if (hue.value >= 120 && hue.value < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
} else if (hue.value >= 180 && hue.value < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
} else if (hue.value >= 240 && hue.value < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
} else if (hue.value >= 300 && hue.value <= 360) {
    r1 = c;
    g1 = 0;
    b1 = x;
}

let r = (r1 + m) * 255;
let g = (g1 + m) * 255;
let b = (b1 + m) * 255;

const result = computed(() => {
    return props.convertToRgb ? `rgb(${r}, ${g}, ${b})` : `hsl(${hue.value}, ${saturationPercentage}, ${lightnessPercentage})`;
});

const { copy, copied } = useClipboard({ result });
</script>
