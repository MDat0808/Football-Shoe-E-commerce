<template>
  <div class="flex flex-col">
    <ImageSlider />
    <div class="flex flex-col gap-4 p-8">
      <ListBrand />
      <BrandShowcase />
      <BestSellingProducts />

      <Questions />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageSlider from "../components/slider/ImageSlider.vue";
import ListProduct from "../components/product/ListProduct.vue";
import ListBrand from "../components/brands/ListBrand.vue";
import Questions from "../components/Questions.vue";
import BestSellingProducts from "../components/homePage/BestSellingProducts .vue";
import BrandShowcase from "../components/homePage/BrandShowcase .vue";
</script>

<style>
.animated-container {
  animation: slide-in 0.5s forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%); /* Start from the left */
    opacity: 0; /* Start invisible */
  }
  to {
    transform: translateX(0); /* End at original position */
    opacity: 1; /* End visible */
  }
}

.animated-title,
.animated-description {
  opacity: 0; /* Bắt đầu với độ mờ là 0 */
  transform: translateX(-20px); /* Bắt đầu từ vị trí bên trái */
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out; /* Thay đổi độ mờ và vị trí */
}

.animated-title {
  animation: fadeInLeft 1s forwards; /* Animation cho h2 */
}

.animated-description {
  animation: fadeInLeft 1s forwards 1s; /* Animation cho p với delay */
}

@keyframes fadeInLeft {
  to {
    opacity: 1; /* Đến độ mờ 1 */
    transform: translateX(0); /* Đến vị trí gốc */
  }
}
</style>
