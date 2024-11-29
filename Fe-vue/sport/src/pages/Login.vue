<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <!-- Container -->
    <div class="w-full bg-white rounded-lg shadow-lg flex flex-wrap">
      <!-- Image Column -->
      <div class="w-full md:w-1/2 bg-indigo-600">
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_590,c_limit/e4695209-3f23-4a05-a9f9-d0edde31b653/nike-just-do-it.jpg"
          alt="Login Banner"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Form Column -->
      <div class="w-full md:w-1/2 p-8 md:p-12">
        <h2 class="text-3xl font-bold text-gray-700 mb-6 text-center">
          Welcome Back
        </h2>
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <!-- Password -->
          <div>
            <label for="password" class="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Log In
          </button>
        </form>
        <p class="text-gray-500 text-sm mt-6 text-center">
          Don't have an account?
          <router-link to="/register" class="text-indigo-600 font-medium">
            Sign up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import userService from "../services/userServices";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin(): Promise<void> {
      try {
        const response = await axios.get(
          `http://localhost:3000/users?email=${this.email}&password=${this.password}`
        );

        if (response.data.let == 0) {
          this.errorMessage = "Email hoặc mật khẩu không hợp lệ.";
          return;
        }

        const user = response.data[0];
        userService.login(user);

        this.$router.back();
      } catch (error) {
        console.log(error);

        alert("Đăng nhập thất bại.");
      }
    },
  },
});
</script>

<style scoped>
/* Optional custom styling */
</style>
