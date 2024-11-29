<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center border-b border-gray-200 py-2">
      <div class="flex space-x-4">
        <span class="font-bold text-lg text-black hover:cursor-pointer"
          >Trending</span
        >
        <div class="border-l h-7"></div>
        <span class="text-lg text-gray-400 hover:cursor-pointer">Sale </span>
      </div>
      <div class="flex-grow"></div>
      <div class="flex space-x-4 text-sm">
        <router-link to="/product/1">
          <span class="text-red-500 font-bold hover:cursor-pointer underline"
            >VIEW ALL</span
          >
        </router-link>
      </div>
    </div>
    <div class="w-full">
      <swiper
        :modules="[Scrollbar]"
        :slides-per-view="4"
        :scrollbar="{ el: '.custom-scrollbar', draggable: true }"
        :space-between="16"
        class="w-full"
      >
        <swiper-slide v-for="(item, index) in items" :key="index">
          <ProductCard :item="item" />
        </swiper-slide>
      </swiper>
      <div class="custom-scrollbar mt-4 hover:cursor-pointer"></div>
    </div>
  </div>
  <!-- <router-link to="/product/1" class="self-center mt-4">
    <button
      class="uppercase border border-solid border-gray-700 bg-white mt-2 px-4 py-2 font-semibold text-sm text-gray-600 hover:bg-black hover:text-white self-center"
    >
      Load more
    </button>
  </router-link> -->
</template>

<script lang="ts">
import ProductCard from "../product/ProductCard.vue";
import Item from "../../data/Item.class";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

export default {
  name: "BestSellingProducts",
  components: {
    ProductCard,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      items: [],
      Scrollbar,
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

<style>
.custom-scrollbar {
  height: 4px;
  background-color: rgba(0, 0, 0, 0.1);
}

.custom-scrollbar .swiper-scrollbar-drag {
  background-color: rgba(61, 0, 0, 0.8); /* Draggable thumb */
  transition: background 0.3s ease-in-out;
}
</style>
