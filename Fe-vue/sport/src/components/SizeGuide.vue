<!-- SizeGuide.vue -->
<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded shadow-lg w-2/3 h-[440px] overflow-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Size Guide</h2>
        <button @click="togglePopup" class="text-gray-400">✕</button>
      </div>
      <img
        src="https://shondo.vn/blog/wp-content/uploads/2024/10/bang-size-giay.jpg"
        class="w-full h-fit object-cover"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SizeGuide",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  setup(_, { emit }) {
    const togglePopup = () => emit("close");

    return { togglePopup };
  },
});
</script>

<style scoped></style>
