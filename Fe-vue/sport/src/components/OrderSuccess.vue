<template>
  <div class="flex justify-center h-screen">
    <div class="p-12 rounded-2xl max-w-lg w-full text-center">
      <div class="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-green-600 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <!-- Tiêu đề -->
      <h2 class="text-4xl text-green-600 font-semibold mb-6">
        Đặt hàng thành công!
      </h2>

      <!-- Hiển thị orderId -->
      <p class="text-gray-700 text-lg mb-6">
        Mã đơn hàng của bạn là: <strong>{{ orderId }}</strong>
      </p>

      <!-- Mô tả -->
      <p class="text-gray-700 text-lg mb-6">
        Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn đang
        được xử lý và sẽ được gửi đến bạn trong thời gian sớm nhất.
      </p>

      <!-- Nút quay lại trang chủ -->
      <div class="mt-6">
        <button
          @click="redirectHome"
          class="w-full sm:w-auto px-8 py-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
        >
          Trở về trang chủ
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "OrderSuccess",
  setup() {
    const router = useRouter();
    const route = useRoute();

    // Get the orderId from route params
    const orderId = route.params.orderID;

    const redirectHome = () => {
      router.push("/");
    };

    return {
      orderId,
      redirectHome,
    };
  },
});
</script>
