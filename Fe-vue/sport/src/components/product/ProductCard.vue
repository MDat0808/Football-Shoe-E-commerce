<template>
  <div class="w-72">
    <div class="relative border rounded-lg shadow-lg flex flex-col">
      <div
        v-if="item.discount > 0"
        class="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded"
      >
        {{ item.discount * 100 }}% OFF
      </div>

      <router-link :to="{ name: 'ProductDetail', params: { id } }">
        <img
          alt="Reebok Classic Core 99 shoe"
          class="w-full h-56 object-cover self-center"
          :src="item.thumbnail"
        />
      </router-link>
      <div
        v-if="item.stock <= 0"
        class="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent opacity-80"
      >
        <div
          class="text-white font-semibold text-xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 p-4 rounded-lg shadow-xl transform scale-110 hover:scale-100 transition-all"
        >
          Hết hàng
        </div>
      </div>

      <div class="flex flex-col items-start p-4 h-32">
        <div class="text-gray-500 flex items-center justify-between w-full">
          <span>{{ item.brand?.name }}</span>
          <div class="text-black flex gap-2">
            <font-awesome-icon
              :class="['w-fit h-4 hover:cursor-pointer']"
              @click="toggleActive"
              :icon="isActive ? ['fas', 'heart'] : ['far', 'heart']"
            />
            <font-awesome-icon
              class="w-fit h-4 hover:cursor-pointer"
              :icon="['fas', 'cart-plus']"
              @click="addToCart()"
            />
          </div>
        </div>
        <div class="text-lg font-bold">{{ item.name }}</div>
        <div class="flex justify-between items-center w-full">
          <span class="text-xl font-bold text-black">
            {{ formatDiscountedPrice(item.price, item.discount) }}
          </span>
          <span
            v-if="item.discount > 0"
            class="text-gray-400 line-through ml-2"
          >
            {{ formatPrice(item.price) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Item from "../../data/Item.class";
import cartServices from "../../services/cartServices";
import Product from "../../data/Product.model";
import {
  formatDiscountedPrice,
  formatPrice,
} from "../../utils/formatDiscoutPrice";
export default defineComponent({
  name: "ProductCard",
  props: {
    item: {
      type: Object as () => Item,
      required: true,
    },
  },
  data() {
    return {
      id: this.item.id,
    };
  },
  methods: {
    addToCart() {
      const newProduct: Product = new Product(
        this.item.id,
        this.item.name,
        this.item.description,
        this.item.price,
        this.item.stock,
        this.item.discount,
        this.item.thumbnail,
        this.item.sizes,
        this.item.colors,
        this.item.sizes[0],
        this.item.colors[0]
      );
      cartServices.addToCart(newProduct);
    },
  },
  setup(props) {
    const isActive = ref(false); // State to track if the icon is clicked

    const toggleActive = () => {
      isActive.value = !isActive.value;
    };

    return {
      item: props.item,
      isActive,
      toggleActive,
      formatDiscountedPrice,
      formatPrice,
    };
  },
});
</script>

<style></style>
