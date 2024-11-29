<template>
  <footer class="w-full bg-white border-t border-gray-200 py-6">
    <div class="container mx-auto px-6">
      <!-- Top Section -->
      <div class="flex flex-wrap justify-between items-center gap-6">
        <!-- Brand Section -->
        <div class="flex flex-col items-start">
          <img
            src="https://storage.googleapis.com/a1aa/image/bKTlecDqa62jXyHzxlf72eyXaJ4czl0efAhtd1VdsKtHjMZdC.jpg"
            alt="Football Shoes Logo"
            class="w-12 h-12 mb-2"
          />
          <p class="text-gray-500 text-sm">
            Your ultimate destination for football shoes.
          </p>
        </div>

        <!-- Navigation Links -->
        <ul class="flex flex-wrap gap-8 text-gray-700 text-sm">
          <li>
            <a href="#" class="hover:text-gray-500 transition">Home</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-500 transition">Shop</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-500 transition">About Us</a>
          </li>
          <li>
            <a href="#" class="hover:text-gray-500 transition">Contact</a>
          </li>
        </ul>
      </div>

      <!-- Divider -->
      <hr class="my-4 border-gray-300" />

      <!-- Bottom Section -->
      <div class="flex flex-wrap justify-between items-center">
        <!-- Social Media Links -->
        <div class="flex gap-4">
          <a href="#" class="text-gray-400 hover:text-gray-700 transition">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-700 transition">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-700 transition">
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-700 transition">
            <font-awesome-icon :icon="['fab', 'youtube']" />
          </a>
        </div>

        <!-- Copyright -->
        <p class="text-gray-500 text-sm">
          &copy; 2024 FootballShoes. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  font-family: "Arial", sans-serif;
}
</style>
