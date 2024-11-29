<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full">
      <div class="flex">
        <div class="w-1/2">
          <div class="relative">
            <img
              :src="selectedImage ? selectedImage : product?.thumbnail"
              alt="Main product image"
              class="w-full max-h-[400px] rounded-lg object-cover"
            />
            <span
              v-if="product?.discount > 0"
              class="absolute top-2 left-2 bg-black font-medium text-white text-xs px-2 py-1 rounded"
              >{{ product?.discount * 100 }}% OFF
            </span>
          </div>
          <div class="flex mt-4 space-x-2">
            <img
              v-for="(image, index) in product?.images"
              @click="selectedImage = image"
              :key="index"
              :src="image"
              :alt="`Thumbnail ${index + 1}`"
              class="w-16 h-16 rounded-lg border hover:cursor-pointer"
            />
          </div>
        </div>
        <div class="w-1/2 pl-6 flex flex-col text-left items-start h-full">
          <h2 class="text-gray-500">{{ product?.brand?.name }}</h2>
          <h1 class="text-3xl font-bold">{{ product?.name }}</h1>
          <p class="text-gray-700 mt-4 line-clamp-5">
            {{ product?.description }}
          </p>

          <div class="flex items-center mt-4">
            <span class="text-2xl font-bold">
              {{
                formatDiscountedPrice(
                  product?.price || 0,
                  product?.discount || 0
                )
              }}
            </span>
            <span class="ml-2 text-red-500 line-through">
              {{ formatPrice(product?.price || 0) }}</span
            >
          </div>
          <div class="mt-4 w-full">
            <div class="flex justify-between">
              <p class="text-gray-700 font-bold text-left">
                Color:
                <span class="font-normal">{{ selectedColor }}</span>
              </p>
              <p
                class="text-gray-600 font-medium underline underline-offset-2 hover:cursor-pointer"
                @click="showSizeGuide = true"
              >
                Size guide
              </p>
              <SizeGuide
                v-if="showSizeGuide"
                :isVisible="showSizeGuide"
                @close="showSizeGuide = false"
              />
            </div>

            <div class="flex mt-2 space-x-2">
              <div
                v-for="(color, index) in product?.colors"
                :key="index"
                class="w-12 h-12 rounded-lg border cursor-pointer"
                :style="{ backgroundColor: color }"
                @click="selectColor(color)"
                :class="{
                  'ring-2 ring-black': color === selectedColor,
                }"
              ></div>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-gray-700 font-bold text-left">
              Size: <span class="font-normal">{{ selectedSize }}</span>
            </div>
            <div class="grid grid-cols-6 gap-2 mt-2">
              <button
                v-for="size in sizeOptions"
                :key="size"
                :class="[
                  'border rounded-lg px-2 py-1 text-sm',
                  { 'bg-black text-white': size === selectedSize },
                ]"
                @click="selectSize(size)"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <button
            @click="addToCart"
            class="mt-16 w-full bg-yellow-400 text-black py-2 rounded-lg text-lg font-bold flex items-center justify-center self-end"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Item from "../../data/Item.class";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  formatDiscountedPrice,
  formatPrice,
} from "../../utils/formatDiscoutPrice";
import SizeGuide from "../SizeGuide.vue";
import axios from "axios";
import Product from "../../data/Product.model"; // Import Product class
import cartServices from "../../services/cartServices"; // Import your cart service
import { log } from "console";

export default defineComponent({
  name: "ProductDetail",
  components: { SizeGuide },
  setup() {
    const route = useRoute();
    let product = ref<Item | null>(null);
    const sizeOptions = ref<string[]>([]);
    const selectedSize = ref<string | null>(null);
    const selectedImage = ref("");
    const selectedColor = ref<string | null>(null);
    const showSizeGuide = ref(false);

    onMounted(async () => {
      const id = route.params.id;
      try {
        const response = await axios.get(`http://localhost:8080/product/${id}`);
        product.value = new Item(
          response.data._id,
          response.data.thumbnail || response.data.images[0],
          response.data.images,
          response.data.name,
          response.data.brand,
          response.data.price,
          response.data.stock,
          response.data.discount,
          response.data.description,
          response.data.colors,
          response.data.sizes
        );
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    });

    watch(
      product,
      (newProduct) => {
        if (newProduct) {
          sizeOptions.value = newProduct.sizes; // Update size options from product
          selectedSize.value = sizeOptions.value[0]; // Set default selected size
          selectedColor.value = newProduct.colors?.[0] || null; // Set default selected color
        } else {
          sizeOptions.value = []; // Reset if product is null
          selectedSize.value = null; // Reset selected size
          selectedColor.value = null; // Reset selected color
        }
      },
      { immediate: true }
    );

    const selectSize = (size: string) => {
      selectedSize.value = size;
    };

    const selectColor = (color: string) => {
      selectedColor.value = color;
    };

    // Move addToCart function into setup
    const addToCart = () => {
      if (product.value && selectedSize.value && selectedColor.value) {
        const newProduct = new Product(
          product.value.id,
          product.value.name,
          product.value.description,
          product.value.price,
          product.value.stock,
          product.value.discount,
          product.value.thumbnail,
          product.value.sizes,
          product.value.colors,
          selectedSize.value,
          selectedColor.value
        );
        cartServices.addToCart(newProduct);
      } else {
        alert(
          "Vui lòng chọn kích thước và màu sắc trước khi thêm vào giỏ hàng."
        );
      }
    };

    return {
      product,
      formatDiscountedPrice,
      formatPrice,
      sizeOptions,
      selectedSize,
      selectSize,
      selectedColor,
      selectColor,
      selectedImage,
      showSizeGuide,
      addToCart, // Expose the method to the template
    };
  },
});
</script>

<style></style>
