<template>
  <div class="w-full">
    <div class="flex h-96 w-full">
      <div class="w-1/2 flex flex-col relative left-24 top-12">
        <div class="w-80">
          <div class="mb-3">
            <p class="italic text-2xl text-green-600 font-mono">Minh Khoi</p>
          </div>
          <div class="mb-3">
            <h2 class="font-bold font-sans text-2xl">
              Quảng cáo Minh Khoi mang đến cho bạn những dịch vụ tuyệt vời nhất,
              những bài quảng cáo hay tuyệt!
            </h2>
          </div>
          <div class="mb-3">
            <p class="font-sans text-xs w-64">
              Nếu muốn đặt banner quảng cáo hoặc bài báo quảng cáo vui lòng liên
              hệ chúng tôi.
            </p>
          </div>
          <div class="flex gap-4">
            <button
              class="mr-2 bg-blue-500 text-white font-medium text-sm px-4 py-1.5 rounded-2xl"
            >
              Đặt ngay
            </button>
            <button class="flex justify-center items-center">
              <div class="w-8">
                <FontAwesomeIcon class="w-8" :icon="faCirclePlay" />
              </div>
              <div class="ml-2 text-center">Take a tour</div>
            </button>
          </div>
        </div>
      </div>
      <div class="w-1/2 h-96 flex justify-center items-center">
        <img
          class="h-full w-full object-cover"
          src="../assets/ads.jpg"
          alt="Ads"
        />
      </div>
    </div>

    <!-- How it works section -->
    <div class="flex flex-col items-center gap-y-4 mt-8">
      <p
        class="bg-blue-100 rounded-lg uppercase text-blue-700 font-semibold text-base px-4 py-2"
      >
        Cách đặt quảng cáo
      </p>
      <h3 class="font-medium text-xl">
        Để đặt banner quảng cáo vui lòng làm theo 3 bước sau
      </h3>
      <div class="flex flex-row gap-8 mt-4">
        <StepCard
          icon="faLocationDot"
          title="Chọn địa chỉ"
          description="Chọn địa chỉ hiện tại của bạn hoặc địa chỉ gần chúng tôi nhất"
        />
        <StepCard
          icon="faCalendarDays"
          title="Chọn thời gian"
          description="Chọn thời gian mà bạn muốn hiển thị banner quảng cáo của bạn."
        />
        <StepCard
          icon="faDesktop"
          title="Chọn vị trí"
          description="Chọn vị trí bạn muốn banner hiển thị trên web của chúng tôi"
        />
      </div>
    </div>

    <!-- Upgrade plan section -->
    <div class="flex flex-col items-center gap-y-4 mt-8">
      <p
        class="bg-blue-100 rounded-lg uppercase text-blue-700 font-semibold text-base px-4 py-2"
      >
        Các gói nổi bật
      </p>
      <h3 class="font-medium text-xl">
        Giá các gói banner phổ biến và thông dụng mọi người hay đặt
      </h3>
      <div class="flex flex-row gap-8 mt-4">
        <PricingCard
          title="Free"
          price="400,000 VND"
          duration="/1 tuần"
          features="['Nằm ở bên trái web', 'Không có gì nổi bật', 'Chỉ có ở một số trang nhất định']"
        />
        <PricingCard
          title="Basic"
          price="800,000 VND"
          duration="/1 tuần"
          features="['Nằm ở bên phải web', 'Có vị trí trung tâm', 'Xuất hiện ở mọi trang']"
        />
        <PricingCard
          title="Premium"
          price="1,200,000 VND"
          duration="/1 tuần"
          features="['Hiển thị ở mọi vị trí', 'Độ phủ sóng cao', 'Ưu tiên ở các trang chính']"
        />
      </div>
    </div>

    <!-- Testimonials section -->
    <div class="flex flex-col items-center gap-y-4 mt-8">
      <p
        class="bg-blue-100 rounded-lg uppercase text-blue-700 font-semibold text-base px-4 py-2"
      >
        Các đánh giá gần đây
      </p>
      <h3 class="font-medium text-xl">
        Hãy xem mọi người nói gì về chúng tôi?
      </h3>
      <div class="flex flex-row justify-center items-center mt-4 max-w-full">
        <div class="w-5/6">
          <!-- Add testimonial content here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCirclePlay,
  faLocationDot,
  faCalendarDays,
  faDesktop,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  name: "ContactAds",
  components: {
    FontAwesomeIcon,
    StepCard: defineComponent({
      props: {
        icon: String,
        title: String,
        description: String,
      },
      template: `
        <div class="w-56 flex flex-col items-center gap-4">
          <div class="w-32 h-28 rounded-lg flex items-center justify-center bg-blue-100">
            <FontAwesomeIcon :icon="['fas', icon]" class="w-8 h-8 text-blue-600" />
          </div>
          <div class="text-center">
            <p class="font-semibold text-lg">{{ title }}</p>
            <p class="text-gray-500 font-medium text-sm mt-2">{{ description }}</p>
          </div>
        </div>
      `,
    }),
    PricingCard: defineComponent({
      props: {
        title: String,
        price: String,
        duration: String,
        features: Array as () => string[],
      },
      template: `
        <div class="w-fit min-h-60 h-64 border-2 border-gray-300 shadow rounded-xl flex">
          <div class="flex flex-col p-4 gap-4">
            <h3 class="text-2xl font-medium">{{ title }}</h3>
            <div>
              <div class="flex items-baseline gap-1">
                <p class="text-2xl font-semibold">{{ price }}</p>
                <p class="text-sm font-medium">{{ duration }}</p>
              </div>
            </div>
            <ul class="text-sm">
              <li v-for="feature in features" :key="feature" class="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon="faCircleCheck" class="w-5 text-green-500" />
                <p>{{ feature }}</p>
              </li>
            </ul>
            <button class="w-full h-8 rounded-lg bg-blue-500 text-white mt-auto">
              Buy now
            </button>
          </div>
        </div>
      `,
    }),
  },
  setup() {
    return {
      faCirclePlay,
      faLocationDot,
      faCalendarDays,
      faDesktop,
      faCircleCheck,
    };
  },
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
