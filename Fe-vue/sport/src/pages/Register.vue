<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <!-- Container -->
    <div class="w-full bg-white rounded-lg shadow-lg flex flex-wrap">
      <!-- Image Column -->
      <div class="w-full md:w-1/2 bg-indigo-600">
        <img
          src="https://i.pinimg.com/736x/a3/e7/70/a3e770dd2d561056f43653df5d71a218.jpg"
          alt="Registration Banner"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Form Column -->
      <div class="w-full md:w-1/2 p-8 md:p-12">
        <h2 class="text-3xl font-bold text-gray-700 mb-6 text-center">
          Create an Account
        </h2>
        <form
          @submit.prevent="handleRegister"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <!-- Full Name -->
          <div class="col-span-2">
            <label for="name" class="block text-gray-600 font-medium mb-1">
              Full Name
            </label>
            <input
              v-model="name"
              type="text"
              id="name"
              placeholder="Enter your full name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div class="col-span-2">
            <label for="address" class="block text-gray-600 font-medium mb-1">
              Address
            </label>
            <input
              v-model="address"
              type="text"
              id="address"
              placeholder="Enter your address"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
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
          <!-- Phone -->
          <div>
            <label for="phone" class="block text-gray-600 font-medium mb-1">
              Phone Number
            </label>
            <input
              maxlength="10"
              minlength="8"
              v-model="phone"
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <!-- Address -->

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
          <!-- Confirm Password -->
          <div>
            <label
              for="confirmPassword"
              class="block text-gray-600 font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <!-- Submit Button -->
          <div class="col-span-2">
            <button
              type="submit"
              class="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </div>
        </form>
        <p v-if="errorMessage" class="text-red-500 mt-2 text-center">
          {{ errorMessage }}
        </p>
        <p class="text-gray-500 text-sm mt-6 text-center">
          Already have an account?
          <router-link to="/login" class="text-indigo-600 font-medium">
            Log in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Reactive state
const name = ref<string>("");
const email = ref<string>("");
const phone = ref<string>("");
const address = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const errorMessage = ref<string>("");
const isValidPhone = (phoneNumber: string): boolean => {
  const regex = /^[0-9]+$/; // Matches only digits
  return regex.test(phoneNumber);
};
const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords không khớp với nhau.";
    return;
  }

  if (password.value.length < 8) {
    errorMessage.value = "Passwords ít nhất 8 ký tự.";
    return;
  }

  if (!isValidPhone(phone.value)) {
    errorMessage.value = "Điện thoại chỉ chứa số.";
    return;
  }

  try {
    // Check if the email is already registered
    const emailCheckResponse = await fetch(
      `http://localhost:3000/users?email=${encodeURIComponent(email.value)}`
    );

    if (!emailCheckResponse.ok) {
      errorMessage.value = "Error checking email uniqueness. Please try again.";
      return;
    }

    const existingUsers = await emailCheckResponse.json();

    if (existingUsers.length > 0) {
      errorMessage.value =
        "This email is already registered. Please use a different email.";
      return;
    }

    // If email is unique, proceed with registration
    const newUser = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      password: password.value,
    };

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      window.location.href = "/login"; // Redirect to login
    } else {
      const data = await response.json();
      errorMessage.value =
        data.message || "An error occurred. Please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = "Failed to register. Please try again.";
  }
};
</script>

<style scoped>
/* Optional: Add any specific styles */
</style>
