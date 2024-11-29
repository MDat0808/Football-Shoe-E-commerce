<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
      <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">
        Thông tin đặt hàng
      </h3>

      <!-- User Info -->
      <div class="mb-4">
        <p><strong>Người đặt:</strong> {{ user.name }}</p>
        <p><strong>Địa chỉ nhận hàng:</strong> {{ user.address }}</p>
      </div>

      <!-- Cart Items -->
      <div v-for="(item, index) in cartItems" :key="index" class="mb-4">
        <p class="text-sm text-gray-700">
          <strong>{{ item.name }}</strong> (x{{ item.quantity }}) -
          <span class="text-xs text-gray-500"
            >size: {{ item.size }}, màu: {{ item.color }}</span
          >
          -
          <span class="font-semibold text-red-600">{{
            formatPrice(item.price * (1 - item.discount) * item.quantity)
          }}</span>
        </p>
      </div>

      <!-- Total Price -->
      <p class="font-bold text-lg text-gray-800 mb-4">
        <strong>Tổng tiền:</strong> {{ formatPrice(totalPrice) }}
      </p>

      <!-- Confirmation Text -->
      <p class="text-sm text-gray-600 mb-6">
        Bạn có chắc chắn muốn tiếp tục? Giỏ hàng sẽ bị xóa.
      </p>

      <!-- Action Buttons -->
      <div class="flex gap-4">
        <button
          class="bg-black text-white px-7 rounded-md"
          @click="confirmAction"
        >
          Có
        </button>
        <button
          class="text-black px-4 py-2 rounded-md border-black border"
          @click="cancelAction"
        >
          Không
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import {
  formatDiscountedPrice as formatDiscountedPriceUtil,
  formatPrice as formatPriceUtil,
} from "../utils/formatDiscoutPrice";
import Product from "../data/Product.model";
import User from "../data/User.model";

export default {
  props: {
    isVisible: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    cartItems: {
      type: Array as PropType<Product[]>,
      required: true,
    },
    totalPrice: {
      type: Number as PropType<number>,
      required: true,
    },
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  methods: {
    confirmAction() {
      this.$emit("confirmed");
    },
    cancelAction() {
      this.$emit("canceled");
    },
    formatDiscountedPrice(price: number, discount: number): string {
      return formatDiscountedPriceUtil(price, discount);
    },
    formatPrice(price: number) {
      return formatPriceUtil(price);
    },
  },
};
</script>

<style scoped></style>
