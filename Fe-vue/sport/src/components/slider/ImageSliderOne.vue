<template>
  <div class="w-full h-[500px] relative">
    <img
      src="https://assets.goal.com/images/v3/blt1e410240273ce87b/Did_You_Know_Man_City_De_Bruyne.jpg?auto=webp&format=pjpg&width=3840&quality=60"
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
      <div
        class="flex self-end mt-2 animated-container z-10"
        :key="animationKey"
      >
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
  name: "ImageSliderOne",
  props: {
    animationKey: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const animateTitle = ref(false);
    const animateDescription = ref(false);
    const animateContainer = ref(false);

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
