<template>
  <div v-if="isDataLoaded" class="flex flex-row justify-start p-4">
    <div class="basis-1/4 flex flex-col items-start ml-8">
      <div>
        <h2 class="text-lg font-bold mb-2">Brands</h2>
        <div v-for="(brand, index) in brands" :key="index" class="mb-4">
          <input
            type="checkbox"
            class="checkbox hidden"
            :id="brand.name"
            @change="toggleBrand(brand.name)"
            :checked="checkedBrands === brand.name"
          />
          <label
            :for="brand.name"
            class="cursor-pointer"
            :class="{ checked: checkedBrands.includes(brand.name) }"
          >
            {{ brand.name }} ({{ brand.productCount }})
          </label>
        </div>
      </div>
      <div>
        <h2 class="text-lg font-bold mb-2">Size</h2>
        <div class="grid grid-cols-4 mb-4">
          <div class="size-button">XS</div>
          <div class="size-button">S</div>
          <div class="size-button selected">M</div>
          <div class="size-button">L</div>
          <div class="size-button">XL</div>
          <div class="size-button">2XL</div>
        </div>
      </div>
      <div>
        <h2 class="text-lg font-bold mb-2">Price</h2>
        <div class="mb-4">
          <input type="range" min="100" max="1000" value="100" class="slider" />
          <input
            type="range"
            min="100"
            max="1000"
            value="1000"
            class="slider"
          />
        </div>
        <div class="flex justify-between text-sm">
          <div>
            <label for="min-price" class="block">Min. Price</label>
            <input
              type="text"
              id="min-price"
              value="$ 100"
              class="border p-1 w-20"
            />
          </div>
          <div>
            <label for="max-price" class="block">Max. Price</label>
            <input
              type="text"
              id="max-price"
              value="$ 1000"
              class="border p-1 w-20"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="basis-2/3 flex flex-col">
      <div class="text-gray-600">Showing 1 - 3 of 9 results.</div>
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center space-x-4">
          <i class="fas fa-th-large text-gray-600"> </i>
          <i class="fas fa-bars text-red-600"> </i>
        </div>
      </div>
      <div class="border-t border-gray-300 mb-4"></div>
      <div class="grid grid-cols-1 gap-8">
        <ProductRow
          v-for="(item, index) in products"
          :key="index"
          :item="item"
        />
      </div>
      <div class="mt-4 self-center">
        <div class="mt-4 self-center">
          <Pagination
            :totalPage="totalPages"
            :currentPage="currentPage"
            @update:currentPage="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
<script lang="ts">
import cartServices from "../services/cartServices";
import Pagination from "../components/Pagination.vue";
import ProductRow from "../components/product/ProductRow.vue";
import axios from "axios";
import Item from "../data/Item.class";
import Brand from "../data/Brand.model";
export default {
  name: "About",
  components: {
    Pagination,
    ProductRow,
  },
  data() {
    return {
      products: [],
      brands: [] as Brand[],
      currentPage: 1,
      totalPages: 1 as number,
      pageSize: 3,
      checkedBrands: "",
      isDataLoaded: false,
    };
  },

  async mounted() {
    await Promise.all([
      this.fetchBrands(),
      this.fetchProducts(this.currentPage),
    ]);
    this.isDataLoaded = true;
  },

  watch: {
    checkedBrands(newBrand, oldBrand) {
      if (newBrand !== oldBrand) {
        this.fetchProductByBrand();
      }
    },

    currentPage(newPage) {
      if (this.checkedBrands) {
        this.fetchProductByBrand();
      } else {
        this.fetchProducts(newPage);
      }
    },
  },

  methods: {
    async fetchProducts(page: number) {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/page/${page}/${this.pageSize}`
        );

        this.products = response.data.products.map((itemData: any) => {
          return new Item(
            itemData._id,
            itemData.thumbnail || itemData.images[0],
            itemData.images,
            itemData.name,
            itemData.brand,
            itemData.price,
            itemData.stock,
            itemData.discount,
            itemData.description,
            itemData.colors,
            itemData.sizes
          );
        });
        this.totalPages = response.data.totalPages; // Update totalPages after fetching products
        console.log(this.totalPages);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },

    async fetchBrands() {
      try {
        const response = await axios.get(`http://localhost:8080/brand`);
        this.brands = response.data.map((item: any) => {
          return new Brand(item.brand, item.productCount);
        });
        console.log(this.brands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },

    async fetchProductByBrand() {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/brand/${this.currentPage}/${this.pageSize}/${this.checkedBrands}`
        );

        this.products = response.data.products.map((itemData: any) => {
          return new Item(
            itemData._id,
            itemData.thumbnail || itemData.images[0],
            itemData.images,
            itemData.name,
            itemData.brand,
            itemData.price,
            itemData.stock,
            itemData.discount,
            itemData.description,
            itemData.colors,
            itemData.sizes
          );
        });
        this.totalPages = response.data.totalPages; // Update totalPages when filtering by brand
        console.log(this.products);
        console.log(this.totalPages);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },

    toggleBrand(brandName: string) {
      if (this.checkedBrands === brandName) {
        // If the same brand is unchecked, reset the filter and fetch all products
        this.checkedBrands = "";
        this.fetchProducts(this.currentPage);
      } else {
        // If a new brand is selected, set the filter
        this.checkedBrands = brandName;
      }
    },

    handlePageChange(page: number) {
      this.currentPage = page;
    },
  },
};
</script>

<style>
.checkbox:checked + label {
  color: #d32f2f;
  font-weight: 700;
}
.checkbox:checked + label::before {
  border-color: #d32f2f;
  background-color: #d32f2f;
}
.checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #d32f2f;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  vertical-align: middle;
}
.checkbox:checked + label::before {
  background-color: #d32f2f;
}
.size-button {
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  text-align: center;
  cursor: pointer;
}
.size-button.selected {
  background-color: #d32f2f;
  color: white;
  border-color: #d32f2f;
}
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 0.25rem;
  background: #d1d5db;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.slider:hover {
  opacity: 1;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  background: #d32f2f;
  cursor: pointer;
  border-radius: 50%;
}
.slider::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  background: #d32f2f;
  cursor: pointer;
  border-radius: 50%;
}
</style>
