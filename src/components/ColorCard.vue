<template>
    <div class="flex h-full w-48 flex-col">
        <div class="h-full rounded border-2"></div>
        <div>
            <ColorSlider :card-number="props.cardNumber" sliderNumber="1" attributo="H" />
            <ColorSlider :card-number="props.cardNumber" sliderNumber="2" attributo="V" />
            <ColorSlider :card-number="props.cardNumber" sliderNumber="3" attributo="L" />
        </div>
    </div>
</template>

<script setup>
import ColorSlider from "../components/ColorSlider.vue";

const props = defineProps(["cardNumber"]);
</script>
