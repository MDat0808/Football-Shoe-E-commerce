<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex items-center border-b border-gray-200 py-2">
      <div class="flex space-x-4">
        <span class="font-bold text-lg text-black">Featured</span>
        <div class="border-l h-7"></div>
        <span class="text-lg text-gray-400">New</span>
      </div>
      <div class="flex-grow"></div>
      <div class="flex space-x-4 text-sm">
        <span class="text-red-500 font-bold">ALL</span>
        <div class="w-[2px] h-7 bg-slate-400"></div>
        <span class="text-gray-500">SHOES</span>
        <span class="text-gray-500">APPAREL</span>
        <span class="text-gray-500">EQUIPMENT</span>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 w-full">
      <ProductCard v-for="(item, index) in items" :key="index" :item="item" />
    </div>
  </div>
</template>

<script lang="ts">
import ProductCard from "./ProductCard.vue";
import Item from "../../data/Item.class";
import axios from "axios";
export default {
  name: "ListProduct",
  components: {
    ProductCard,
  },
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:8080/product"); // Replace with your actual API endpoint

      this.items = response.data.map(
        (itemData: any) =>
          new Item(
            itemData._id,
            itemData.thumbnail || itemData.images[0],
            itemData.images,
            itemData.name,
            itemData.brand,
            itemData.price,
            itemData.stock,
            itemData.discount,
            itemData.description,
            itemData.colors,
            itemData.sizes
          )
      );
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  },
};
</script>

<style></style>
