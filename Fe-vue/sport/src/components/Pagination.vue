<template>
  <div class="mt-2 flex w-full justify-start py-2">
    <nav>
      <ul class="list-style-none flex">
        <li @click="prev">
          <div
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="currentColor"
              aria-hidden="true"
              class="text-gray-400 min-w-4 max-h-4"
            >
              <path
                d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
          </div>
        </li>

        <!-- Page Numbers -->
        <li
          v-for="(el, index) in pagination.value"
          :key="index"
          @click="setPage(el)"
        >
          <div
            :class="[
              'flex items-center cursor-pointer justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
              { 'active-check': activePage === el && typeof el === 'number' },
            ]"
          >
            {{ el }}
          </div>
        </li>

        <li @click="next">
          <div
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="currentColor"
              aria-hidden="true"
              class="text-gray-400 min-w-4 max-h-4"
            >
              <path
                d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
              />
            </svg>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import usePagination from "../hook/usePagination"; // Import your pagination hook

export default {
  name: "Pagination",
  props: {
    totalPage: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:currentPage"],
  setup(props, { emit }) {
    const activePage = ref(1);
    const pagination = computed(() =>
      usePagination(props.totalPage, activePage.value, 1)
    );

    watch(
      [() => props.totalPage, activePage],
      () => {
        emit("update:currentPage", activePage);
      },
      { immediate: true }
    );

    watch(
      () => props.totalPage,
      (newTotalPage) => {
        activePage.value = 1; // Reset to first page when total pages change
        emit("update:currentPage", activePage.value);

        pagination.value = computed(() =>
          usePagination(newTotalPage, activePage.value, 1)
        );
      },
      { immediate: true }
    );

    const prev = () => {
      if (activePage.value === 1) {
        alert("Đã ở trang đầu");
      } else {
        activePage.value -= 1;
      }
    };

    const next = () => {
      if (activePage.value >= props.totalPage) {
        alert("Đã ở trang cuối");
      } else {
        activePage.value += 1;
      }
    };

    const setPage = (el) => {
      if (el === "...") {
        alert("Không thể chọn trang này");
      } else {
        activePage.value = el;
      }
    };

    return {
      activePage,
      pagination,
      prev,
      next,
      setPage,
    };
  },
};
</script>

<style scoped>
.active-check {
  background-color: black;
  color: white; /* Example active color */
}
</style>
