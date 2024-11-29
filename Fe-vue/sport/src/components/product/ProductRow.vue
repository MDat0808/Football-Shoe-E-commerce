<template>
  <div class="flex gap-4">
    <router-link :to="{ name: 'ProductDetail', params: { id } }">
      <img
        alt="White running shoes"
        class="w-44 h-44 object-cover"
        height="100"
        :src="item.thumbnail"
        width="100"
      />
    </router-link>
    <div class="flex-1 ml-4 border-r max-w-[460px]">
      <div class="text-xl font-bold text-red-600">{{ item.name }}</div>
      <div class="text-gray-600 mb-2 line-clamp-3">
        {{ item.description }}
      </div>
      <ul class="text-gray-600 mb-4">
        <li>• Available in {{ item.colors.length }} colors</li>
        <li>
          • Size ranges from {{ item.sizes[0] }} to
          {{ item.sizes[item.sizes.length - 1] }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col justify-between">
      <div class="text-2xl font-bold text-gray-800 mb-2">${{ item.price }}</div>

      <div class="text-gray-600 mb-4">Stock: {{ item.stock }} Available</div>
      <button
        @click="addToCart"
        class="bg-red-600 text-white px-4 py-2 rounded mb-2"
      >
        ADD TO CART
      </button>
      <div class="flex space-x-2 text-gray-500">
        <button class="border border-gray-500 px-3 py-2 rounded">
          <font-awesome-icon class="font-light" :icon="['far', 'heart']" />
        </button>
        <button class="border border-gray-500 px-3 py-2 rounded">
          <font-awesome-icon :icon="['far', 'share-from-square']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Item from "../../data/Item.class";
import Product from "../../data/Product.model";
import cartServices from "../../services/cartServices";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductRow",
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
});
</script>

<style scoped></style>
