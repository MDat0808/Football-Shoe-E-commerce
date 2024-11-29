<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center border-b border-gray-200 py-2">
      <div class="flex space-x-4">
        <span class="font-bold text-2xl text-black">WHAT'S HOT </span>
      </div>
      <div class="flex-grow"></div>
    </div>

    <swiper
      :modules="modules"
      :slides-per-view="3.3"
      :pagination="{
        el: '.my-custom-pagination',
        clickable: true,
      }"
      class="w-full"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <ProductCardSilder :item="item" />
      </swiper-slide>
    </swiper>
    <div
      class="my-custom-pagination flex gap-3 justify-center hover:cursor-pointer"
    ></div>
  </div>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import ProductCardSilder from "../product/ProductCardSilder.vue";

export default {
  name: "BrandShowcase",
  components: {
    ProductCardSilder,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      items: [
        {
          id: "1",
          thumbnail:
            "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_469,c_limit/38ed4b8e-9cfc-4e66-9ddd-02a52314eed9/nike-just-do-it.jpg",
          brand: {
            name: "Reebok",
          },
        },
        {
          id: "2",
          thumbnail:
            "https://images.puma.com/image/upload/c_scale,f_auto,q_auto:good,w_1536/cms/images/47018d7e250a393ec17d4735832ec077a9f61f49?_a=BAMAH2fi0",
          brand: {
            name: "Nike",
          },
        },
        {
          id: "3",
          thumbnail:
            "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_400,w_400/sportswear_fw24_zne_launch_mglp_carousel_mini_lookbook_1_d_762141e477.jpg",
          brand: {
            name: "Adidas",
          },
        },
        {
          id: "4",
          thumbnail:
            "https://www.newbalance.com/dw/image/v2/AAGI_PRD/on/demandware.static/-/Library-Sites-NBUS-NBCA/default/dwfe016be3/images/page-designer/2023/june/15143_Comp_E_Image2.jpg?sw=1616&sfrm=jpg",
          brand: {
            name: "Adidas",
          },
        },
      ],
    };
  },
  async mounted() {},
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>

<style>
.swiper-pagination-bullet-active {
  background: black;
}
</style>
