<template>
  <div class="w-[320px]">
    <div class="relative border rounded-lg shadow-lg flex flex-col">
      <router-link to="/">
        <img
          alt="Reebok Classic Core 99 shoe"
          class="w-full h-[400px] object-cover"
          :src="item.thumbnail"
        />
      </router-link>

      <div class="flex flex-col absolute bottom-8 left-8">
        <button
          class="bg-white text-black font-medium rounded-xl px-4 py-1 hover:bg-amber-50"
        >
          {{ item.brand?.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProductCardSilder",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.item.id,
    };
  },
});
</script>

<style></style>
