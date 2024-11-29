<template>
  <div class="w-44 h-32 border">
    <img
      :src="brand.image"
      :alt="brand.name"
      class="w-full h-full object-cover"
    />
  </div>
</template>

<script lang="ts">
import Brand from "../../data/Brands.model";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BrandCard",
  props: {
    brand: {
      type: Object as () => Brand,
      required: true,
    },
  },
});
</script>

<style></style>
