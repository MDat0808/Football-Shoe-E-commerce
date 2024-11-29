<template>
  <div class="flex flex-col p-4 text-center">
    <h2 class="font-semibold text-sm text-gray-500 uppercase">
      The most prominent brands
    </h2>
    <h2 class="font-bold text-2xl text-gray-800 tracking-[6px] uppercase">
      Form our Brands
    </h2>
    <div class="grid grid-cols-6 gap-2 mt-4">
      <BrandCard v-for="(item, index) in brands" :key="index" :brand="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BrandCard from "./BrandCard.vue";
import Brand from "../../data/Brands.model";
import Brands from "../../data/brands.data";
export default defineComponent({
  name: "ListBrand",
  components: {
    BrandCard,
  },
  data() {
    return {
      brands: Brands as Brand[],
    };
  },
});
</script>

<style></style>
