<template>
  <header class="bg-white shadow">
    <div class="container mx-auto flex items-center justify-between py-4 px-4">
      <div class="flex items-center basis-1/3">
        <div class="bg-red-600 p-4">
          <img
            alt="Ornaldo Sports Logo"
            class="h-12 w-20"
            src="https://storage.googleapis.com/a1aa/image/bKTlecDqa62jXyHzxlf72eyXaJ4czl0efAhtd1VdsKtHjMZdC.jpg"
          />
        </div>
        <span class="text-white font-bold text-lg ml-2"> ORNALDO SPORTS </span>
      </div>
      <nav class="flex items-center space-x-6 basis-1/3">
        <router-link to="/" class="text-red-600 font-bold">HOME</router-link>
        <router-link to="/shop" class="text-gray-700">SHOP</router-link>
        <router-link to="/contact" class="text-gray-700">CONTACT</router-link>
        <router-link to="/about" class="text-gray-700">ABOUT</router-link>
        <router-link to="/portfolios" class="text-gray-700"
          >PORTFOLIOS</router-link
        >
        <router-link to="/elements" class="text-gray-700">ELEMENTS</router-link>
      </nav>
      <div class="flex items-center justify-end space-x-2 basis-1/3">
        <div class="p-2">
          <i class="fas fa-search text-white"> </i>
        </div>
        <div class="p-2 flex items-center gap-4">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          <router-link to="/cart">
            <div class="relative">
              <font-awesome-icon :icon="['fas', 'cart-shopping']" />
              <div
                class="absolute animate-bounce top-[-12px] right-[-14px] w-5 h-5 p-2 flex items-center justify-center bg-red-500 text-white rounded-full text-[10px]"
              >
                {{ totalItems > 9 ? "9+" : totalItems }}
              </div>
            </div>
          </router-link>
          <div class="w-[1px] h-6 bg-gray-500"></div>

          <div v-if="isLoggedIn" class="relative">
            <div
              class="flex items-center justify-center hover:cursor-pointer"
              @click="toggleDropdown"
            >
              <font-awesome-icon
                :icon="['far', 'user']"
                class="text-sm cursor-pointer mr-2"
              />
              {{ user?.name }}
            </div>
            <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-40 z-10 bg-white shadow-lg rounded-md"
            >
              <!-- <a href="#" class="block px-4 py-2 text-black hover:bg-gray-200"
                >Thông tin cá nhân</a
              > -->
              <a
                href="#"
                @click="logout"
                class="block px-4 py-2 text-black hover:bg-gray-200"
                >Đăng xuất</a
              >
            </div>
          </div>

          <router-link v-else to="/login" class="">
            <div class="flex items-center justify-center">
              <font-awesome-icon
                :icon="['far', 'user']"
                class="text-sm cursor-pointer"
              />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import cartServices from "../services/cartServices";
import userService from "../services/userServices";
import User from "../data/User.model"; // Assuming User model exists

export default {
  name: "Header",
  setup() {
    const totalItems = ref<number>(0);
    const isLoggedIn = ref<boolean>(userService.isLoggedIn()); // Type explicitly
    const user = ref<User | null>(userService.getUser()); // Type as User or null
    const showDropdown = ref<boolean>(false); // Type explicitly

    const updateTotalItems = (): void => {
      totalItems.value = cartServices.getTotalItems();
    };

    const logout = (): void => {
      userService.logout();
      isLoggedIn.value = false;
    };

    const toggleDropdown = (): void => {
      showDropdown.value = !showDropdown.value;
    };

    onMounted(() => {
      updateTotalItems();

      // Listen for events when cart or user data is updated
      cartServices.eventEmitter.on("cartUpdated", updateTotalItems);
      userService.eventEmitter.on("userLoggedIn", () => {
        isLoggedIn.value = true;
      });
      userService.eventEmitter.on("userLoggedOut", () => {
        isLoggedIn.value = false;
      });
    });

    onBeforeUnmount(() => {
      // Clean up the event listeners
      cartServices.eventEmitter.off("cartUpdated", updateTotalItems);
      userService.eventEmitter.off("userLoggedIn");
      userService.eventEmitter.off("userLoggedOut");
    });

    return {
      totalItems,
      isLoggedIn,
      showDropdown,
      logout,
      toggleDropdown,
      user,
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here if needed */
</style>
