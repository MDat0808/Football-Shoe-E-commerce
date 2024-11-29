<template>
  <div v-if="carts.length > 0" class="flex flex-row gap-2">
    <div class="basis-2/3 md:w-2/3 flex flex-col items-start p-4">
      <h1 class="text-2xl font-semibold mb-4">Giỏ hàng của bạn</h1>
      <p class="text-base font-serif">
        Các mặt hàng trong giỏ hàng của bạn không được bảo lưu — hãy kiểm tra
        ngay để đặt hàng.
      </p>
      <div class="w-full mx-auto mt-4">
        <div v-for="item in carts" :key="item.id">
          <CartItem
            :item="item"
            @update-item="updateCartItem"
            @remove-item="removeItem"
          />
        </div>
      </div>
    </div>
    <div class="basis-1/3 md:w-1/3">
      <div class="p-4">
        <div class="flex items-center justify-center">
          <button
            @click="paymentComfirm"
            class="relative bg-black text-white font-bold px-6 py-3 rounded flex items-center justify-between group w-full hover:text-gray-400"
          >
            <span class="mr-2">THANH TOÁN</span>
            <span
              class="transform group-hover:translate-x-1 transition-transform"
            >
              →
            </span>
            <div
              class="absolute bottom-0 right-0 w-full h-full border border-black translate-x-1 translate-y-1 transition-transform"
            ></div>
          </button>
        </div>

        <h1 class="text-xl font-bold mb-4 mt-8">TÓM TẮT ĐƠN HÀNG</h1>
        <div class="flex justify-between mb-2">
          <span>{{ carts.length }} sản phẩm</span>
          <span>{{ formatPrice(totalPrice) }}</span>
        </div>
        <div class="flex justify-between mb-4">
          <span>Tiết kiệm</span>
          <span>{{ formatPrice(totalDiscount) }}</span>
        </div>
        <div class="flex justify-between mb-4">
          <span>Giao hàng</span>
          <span>Miễn phí</span>
        </div>
        <div class="flex justify-between font-bold mb-2">
          <span>Tổng</span>
          <span>{{ formatPrice(totalPrice) }}</span>
        </div>
        <div class="text-gray-500 mb-8 text-left">(Đã bao gồm thuế $0)</div>
        <div class="relative mb-4">
          <input
            type="text"
            id="promo-code"
            placeholder=" "
            class="w-full border border-black p-3 pt-5 focus:border-blue-500 focus:outline-none"
          />
          <label
            for="promo-code"
            class="absolute left-3 -top-2 bg-white px-1 text-gray-500 text-sm transition-all duration-200 transform scale-75 origin-left pointer-events-none"
          >
            Nhập mã khuyến mãi của bạn
          </label>
        </div>
        <div class="font-bold">PHƯƠNG THỨC THANH TOÁN ĐƯỢC CHẤP NHẬN</div>
        <div class="flex flex-row gap-2 mt-4">
          <img
            src="https://www.adidas.com.vn/static/checkout/react/5ab9320/assets/img/accepted-payment-methods/icon-adidas-cash_on_delivery.svg"
            alt="Cash"
          />
          <img
            src="https://www.adidas.com.vn/static/checkout/react/5ab9320/assets/img/accepted-payment-methods/icon-adidas-mastercard.svg"
            alt="Mastercard"
          />
          <img
            src="https://www.adidas.com.vn/static/checkout/react/5ab9320/assets/img/accepted-payment-methods/icon-adidas-visa.svg"
            alt="Visa"
          />
        </div>
      </div>
    </div>
    <OrderConfirm
      :isVisible="isModalVisible"
      :cartItems="carts"
      :totalPrice="totalPrice"
      :user="user"
      @confirmed="proceedWithAction"
      @canceled="cancelAction"
    />
  </div>
  <div v-else class="flex flex-col items-start pl-20 justify-center h-96">
    <h1 class="text-3xl font-bold text-black mb-4">TÚI CỦA BẠN TRỐNG</h1>
    <p class="text-gray-600 text-center mb-6">
      Khi bạn thêm một món hàng vào túi của mình - nó sẽ hiển thị ở đây. Sẵn
      sàng để bắt đầu chưa?
    </p>
    <div class="flex items-center justify-center">
      <router-link to="/">
        <button
          class="relative bg-black text-white font-bold px-6 py-3 rounded flex items-center justify-between group w-full hover:text-gray-400"
        >
          <span class="mr-2">GET STARTED</span>
          <span
            class="transform group-hover:translate-x-1 transition-transform"
          >
            →
          </span>
          <div
            class="absolute bottom-0 right-0 w-full h-full border border-black translate-x-1 translate-y-1 transition-transform"
          ></div>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Product from "../data/Product.model";
import cartServices from "../services/cartServices";
import { defineComponent } from "vue";
import { formatPrice as formatPriceUtil } from "../utils/formatDiscoutPrice"; // Rename the import to avoid confusion
import CartItem from "../components/product/CartItem.vue";
import userService from "../services/userServices";
import User from "../data/User.model";
import OrderConfirm from "../components/OrderConfirm.vue";
import axios from "axios";
export default defineComponent({
  name: "Cart",
  components: { CartItem, OrderConfirm },
  data() {
    return {
      isModalVisible: false,
      carts: [] as Product[],
      user: null as User | null,
    };
  },
  computed: {
    totalPrice(): number {
      return this.carts.reduce(
        (total, item) =>
          total + item.price * (1 - item.discount) * item.quantity,
        0
      );
    },
    totalDiscount(): number {
      return this.carts.reduce((total, item) => {
        const originalPrice = item.price * item.quantity;
        const discountedPrice = originalPrice * (1 - item.discount);
        return total + (originalPrice - discountedPrice);
      }, 0);
    },
  },
  methods: {
    loadCart(): void {
      this.carts = cartServices.getCart();
    },
    formatPrice(price: number): string {
      return formatPriceUtil(price);
    },

    removeItem(itemId: string) {
      cartServices.removeFromCart(itemId);
      this.loadCart(); // Reload cart items from localStorage
    },
    updateCartItem(product: Product): void {
      this.carts = this.carts.map((item) => {
        if (item.id === product.id) {
          item.size = product.size;
          item.color = product.color;
          item.quantity = product.quantity;
        }
        return item;
      });

      cartServices.updateCart(this.carts);
    },
    paymentComfirm() {
      const user = userService.getUser();
      if (!this.carts || this.carts.length === 0)
        return alert("Giỏ hàng của bạn đang trống.");

      if (!user) {
        this.$router.push("/login");
      } else {
        this.user = user;
        this.showConfirmationModal();
      }
    },
    async proceedWithAction() {
      this.isModalVisible = false;

      const orderId = Math.floor(10000000 + Math.random() * 90000000);
      try {
        // Example API Call: Replace with your API endpoint
        const response = await axios.post(
          `http://localhost:8080/product/order`,
          {
            orderItems: cartServices.getCart().map((item: Product) => ({
              productId: item.id,
              quantity: item.quantity,
            })),
          }
        );

        // Check the response and route to success page
        if (response.status === 201) {
          this.$router.push({
            name: "OrderSuccess",
            params: {
              orderID: orderId,
            },
          });
          cartServices.clearCart(); // Clear cart only if API call succeeds
        } else {
          console.error("Order submission failed:", response.data);
        }
      } catch (error) {
        console.error("Error during API call:", error);
        alert("Failed to process the order. Please try again.");
      }
    },
    showConfirmationModal() {
      this.isModalVisible = true;
    },
    cancelAction() {
      this.isModalVisible = false;
    },
  },
  mounted() {
    this.loadCart();
  },
});
</script>
