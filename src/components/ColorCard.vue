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
import { computed, onUpdated, ref, watch } from "vue";
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

const saturationForConversion = computed(() => {
    return saturation.value / 100;
});

const lightness = useStorage(`palette${props.selectedPalette}-card${props.cardNumber}-slider3`, 50);

const lightnessForConversion = computed(() => {
    return lightness.value / 100;
});

const css = useStyleTag(`#card${props.cardNumber} { background-color: hsl(${hue.value}, ${saturation.value}%, ${lightness.value}%) }`, {
    id: `id${props.cardNumber}`,
});

watch([hue, saturation, lightness], ([newHue, newSaturation, newLightness]) => {
    if ((newHue, newSaturation, newLightness)) {
        css.value = useStyleTag(`#card${props.cardNumber} { background-color: hsl(${newHue}, ${newSaturation}%, ${newLightness}%) }`, {
            id: `id${props.cardNumber}`,
        });
    }
});

// Logica Conversione

const c = computed(() => {
    return (1 - (lightnessForConversion.value * 2 - 1)) * saturationForConversion.value;
});

const x = computed(() => {
    return c.value * (1 - (((hue.value / 60) % 2) - 1));
});

const m = computed(() => {
    return lightnessForConversion.value - c.value / 2;
});

// const r1 = ref(null);
// const g1 = ref(null);
// const b1 = ref(null);

const rgb1 = ref([null, null, null]);

onUpdated(() => {
    if (hue.value >= 0 && hue.value < 60) {
        rgb1.value = [c.value, x.value, 0];
        console.log(rgb1.value);
    } else if (hue.value >= 60 && hue.value < 120) {
        r1.value = x.value;
        g1.value = c.value;
        b1.value = 0;
    } else if (hue.value >= 120 && hue.value < 180) {
        r1.value = 0;
        g1.value = c.value;
        b1.value = x.value;
    } else if (hue.value >= 180 && hue.value < 240) {
        r1.value = 0;
        g1.value = x.value;
        b1.value = c.value;
    } else if (hue.value >= 240 && hue.value < 300) {
        r1.value = x.value;
        g1.value = 0;
        b1.value = c.value;
    } else if (hue.value >= 300 && hue.value <= 360) {
        r1.value = c.value;
        g1.value = 0;
        b1.value = x.value;
    }
});

// let r = (r1 + m.value) * 255;
// let g = (g1 + m.value) * 255;
// let b = (b1 + m.value) * 255;

const result = computed(() => {
    return props.convertToRgb ? `rgb(${r}, ${g}, ${b})` : `hsl(${hue.value}, ${saturationPercentage.value}, ${lightnessPercentage.value})`;
});

const { copy, copied } = useClipboard({ result });
</script>
