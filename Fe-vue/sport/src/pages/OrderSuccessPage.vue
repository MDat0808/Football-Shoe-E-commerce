<template>
  <div>
    <OrderSuccess />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderSuccess from "../components/OrderSuccess.vue";

export default defineComponent({
  name: "OrderSuccessPage",
  components: {
    OrderSuccess,
  },
});
</script>

<style scoped></style>
