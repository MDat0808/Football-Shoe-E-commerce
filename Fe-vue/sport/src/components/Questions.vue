<template>
  <div className="mt-12">
    <div className="flex justify-between">
      <div className=" w-1/2 relative">
        <div class="absolute top-10 left-4 text-white flex flex-col">
          <h1 className="text-2xl font-bold mb-2">
            Behind every success is a story
          </h1>
          <p className="mb-4 italic line-clamp-2 max-w-96 ">
            A good pair of shoes is very important for a player. It can affect
            your performance on the pitch.
          </p>
        </div>
        <img
          src="https://aobongda.net/pic/Images/Module/News/images/t29.jpg"
          alt="A mountain with a backpack in the foreground"
          className="w-full h-full"
        />
      </div>
      <div className="w-1/2 pl-8">
        <h2 className="text-xl font-bold mb-4">Questions</h2>
        <div class="flex flex-col gap-8">
          <div class="border-b pb-4" v-for="(faq, index) in faqs" :key="index">
            <h3
              class="text-lg font-semibold flex justify-between items-center cursor-pointer"
              @click="toggleFaq(index)"
            >
              {{ faq.question }}
              <font-awesome-icon
                class="text-red-500 h-4 w-4"
                :icon="faq.isOpen ? ['fas', 'minus'] : ['fas', 'plus']"
              />
            </h3>
            <p v-if="faq.isOpen" class="text-gray-600 mt-2">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-between mt-8">
      <div className="bg-pink-100 p-4 w-1/3 text-center">
        <font-awesome-icon
          class="text-2xl text-red-500 mb-2 w-8"
          :icon="['fas', 'globe']"
        />
        <h3 className="font-semibold">Worldwide Shipping</h3>
        <p className="text-gray-600">
          Doesn't matter wherever you are, you will always get your order.
        </p>
      </div>
      <div className="bg-pink-100 p-4 w-1/3 text-center mx-4">
        <font-awesome-icon
          class="text-2xl text-red-500 mb-2 w-8"
          :icon="['fas', 'truck-fast']"
        />
        <h3 className="font-semibold">Free Delivery</h3>
        <p className="text-gray-600">
          No more additional fees other than what you pay for what you want.
        </p>
      </div>
      <div className="bg-pink-100 p-4 w-1/3 text-center">
        <font-awesome-icon
          class="text-red-500 mb-2 h-6 w-8"
          :icon="['fas', 'shield-heart']"
        />
        <h3 className="font-semibold">Secure Transaction</h3>
        <p className="text-gray-600">
          We are a verified marketplace since 2018. Safety guarantee.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const faqs = ref([
      {
        question: "How do I determine the right size for my sportswear?",
        answer:
          "We provide a detailed size guide on each product page to help you find the perfect fit. You can refer to the measurements and follow our ideal sizing recommendations. If you have any specific questions about sizing, feel free to reach out to our customer support team for assistance.",
        isOpen: true,
      },
      {
        question: "How long does shipping my order take?",
        answer:
          "Shipping times vary depending on your location. Typically, it takes 3-5 business days for domestic shipping and 7-14 business days for international shipping.",
        isOpen: false,
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes, we do offer international shipping. Please refer to our shipping policy for more details on delivery times and costs.",
        isOpen: false,
      },
    ]);

    const toggleFaq = (index: number) => {
      faqs.value[index].isOpen = !faqs.value[index].isOpen;
    };

    return {
      faqs,
      toggleFaq,
    };
  },
});
</script>

<style></style>
