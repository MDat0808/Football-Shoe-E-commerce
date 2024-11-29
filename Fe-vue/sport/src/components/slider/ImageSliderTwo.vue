<template>
  <div class="w-full h-[500px] relative">
    <img
      src="https://file.hstatic.net/200000278317/file/ronaldo-va-nike-sap-duong-ai-nay-di-1_b2ca3d7104a54c48b7add95c0f3c6757.jpg"
      alt="thumbnail"
      class="w-full h-full object-cover"
    />
    <div
      class="absolute top-1/4 right-20 text-white flex flex-col gap-2 bg-opacity-50"
    >
      <h2
        class="text-2xl font-bold uppercase animated-title z-10"
        :key="animationKey"
      >
        Sự lựa chọn của những nhà vô địch!
      </h2>
      <p class="self-end animated-description z-10" :key="animationKey">
        Dễ dàng tìm thấy đôi giày yêu thích cho bạn.
      </p>
      <div class="flex self-end mt-2 animated-container z-10">
        <div class="flex items-center bg-red-600 text-white px-4 py-2">
          <span>Mua ngay</span>
        </div>
        <div class="flex items-center bg-black text-white px-4 py-2">
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";

export default defineComponent({
  name: "ImageSliderTwo",
  props: {
    animationKey: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const animateTitle = ref(false);
    const animateDescription = ref(false);

    watch(
      () => props.animationKey,
      () => {
        animateTitle.value = true;
        animateDescription.value = true;
        setTimeout(() => {
          animateTitle.value = false;
          animateDescription.value = false;
        }, 1000);
      }
    );

    return {
      animateTitle,
      animateDescription,
    };
  },
});
</script>

<style scoped>
.animated-title,
.animated-description,
.animated-container {
  opacity: 0; /* Bắt đầu với độ mờ là 0 */
  transform: translateX(-50%); /* Bắt đầu từ vị trí bên trái */
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out; /* Thay đổi độ mờ và vị trí */
}

.animated-title[animationKey] {
  opacity: 1;
  transform: translateX(0);
}

.animated-description[animationKey] {
  opacity: 1;
  transform: translateX(0);
}
.animated-container {
  opacity: 1;
  transform: translateX(0);
}
</style>
