<template>
  <div class="flex items-center border-t border-gray-200 py-4">
    <img
      :src="item.image"
      alt="Product image"
      class="w-32 h-32 object-cover rounded"
    />
    <div class="ml-4 flex flex-col w-full gap-4">
      <div class="flex flex-row justify-between w-full">
        <div>
          <h2 class="text-xl font-semibold">{{ item.name }}</h2>
          <div class="text-gray-500 self-start flex">
            <span class="text-green-500">{{
              item.quantity > 0 ? "Còn hàng" : "Hết hàng"
            }}</span>
          </div>
        </div>
        <div class="text-xl font-semibold">
          {{ formatDiscountedPrice(item.price, item.discount) }}
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <select
            v-model="localSize"
            @change="onSizeChange"
            class="border rounded px-2 py-1"
          >
            <option v-for="size in item.sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>

          <select
            v-model="localColor"
            @change="onColorChange"
            class="border rounded px-2 py-1"
          >
            <option v-for="color in item.colors" :key="color" :value="color">
              {{ color }}
            </option>
          </select>

          <div class="flex items-center border rounded px-2 py-1">
            <button @click="decrementQuantity" class="px-2">-</button>
            <span class="px-2">{{ item.quantity }}</span>
            <button @click="incrementQuantity" class="px-2">+</button>
          </div>
        </div>
        <div>
          <div class="mt-2 flex items-center space-x-4">
            <button class="flex items-center text-gray-500">
              <font-awesome-icon :icon="['fas', 'heart']" />
              <span class="ml-1">Save</span>
            </button>
            <button
              @click="$emit('remove-item', item.id)"
              class="flex items-center text-gray-500"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
              <span class="ml-1">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  formatDiscountedPrice,
  formatPrice,
} from "../../utils/formatDiscoutPrice";
export default defineComponent({
  name: "CartItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    // Local refs to handle size and color changes
    const localSize = ref(props.item.size);
    const localColor = ref(props.item.color);

    // Methods to emit events for updates
    const onSizeChange = () => {
      emit("update-item", { ...props.item, size: localSize.value });
    };

    const onColorChange = () => {
      emit("update-item", { ...props.item, color: localColor.value });
    };

    const incrementQuantity = () => {
      if (props.item.quantity < props.item.stock) {
        emit("update-item", {
          ...props.item,
          quantity: props.item.quantity + 1,
        });
      } else {
        alert(
          `Hiện tại sản phẩm này chỉ còn ${props.item.quantity} nên không thể thêm`
        );
      }
    };

    const decrementQuantity = () => {
      if (props.item.quantity > 1) {
        emit("update-item", {
          ...props.item,
          quantity: props.item.quantity - 1,
        });
      }
    };

    return {
      localSize,
      localColor,
      onSizeChange,
      onColorChange,
      incrementQuantity,
      decrementQuantity,
      formatDiscountedPrice,
      formatPrice,
    };
  },
});
</script>
