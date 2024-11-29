<template>
  <div class="relative w-full h-[500px] overflow-hidden">
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="`transform: translateX(-${currentIndex * 100}%);`"
    >
      <component
        v-for="(item, index) in items"
        :key="index"
        :is="item"
        :animation-key="currentIndex"
        class="w-full h-full flex-shrink-0 relative"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, markRaw } from "vue";
import ImageSliderOne from "./ImageSliderOne.vue"; // Make sure this component is properly defined
import ImageSliderTwo from "./ImageSliderTwo.vue";
import ImageSliderThree from "./ImageSliderThree.vue";
export default defineComponent({
  name: "ListProduct",
  setup() {
    const items = ref([
      markRaw(ImageSliderOne),
      markRaw(ImageSliderTwo),
      markRaw(ImageSliderThree),
    ]);
    const currentIndex = ref(0);

    const next = () => {
      currentIndex.value = (currentIndex.value + 1) % items.value.length;
    };

    const prev = () => {
      currentIndex.value =
        (currentIndex.value - 1 + items.value.length) % items.value.length;
    };

    let interval: ReturnType<typeof setInterval>; // Declare interval with proper type

    const startAutoSlider = () => {
      interval = setInterval(next, 5000); // Change slide every 5 seconds
    };

    const stopAutoSlider = () => {
      clearInterval(interval);
    };

    onMounted(() => {
      startAutoSlider();
    });

    onBeforeUnmount(() => {
      stopAutoSlider();
    });

    return {
      items,
      currentIndex,
      next,
      prev,
    };
  },
});
</script>

<style scoped></style>
