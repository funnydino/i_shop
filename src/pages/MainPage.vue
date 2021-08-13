<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info" :class="{ hidden: productsLoading }">
        Всего товаров: {{ countProducts }}
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
      />
      <div
        class="products__loading-info"
        v-if="products.length === 0 && !productsLoadingFailed"
      >
        <h2
          :class="[
            'products__loading-text',
            { 'products__loading-active': productsLoading },
          ]"
          v-if="productsLoading"
        >
          Выполняется загрузка товаров...
        </h2>
        <h2
          :class="[
            'products__loading-text',
            { 'products__loading-failed': !productsLoading },
          ]"
          v-else
        >
          Товаров с выбранными параметрами не найдено
        </h2>
      </div>
      <div class="products__loading-info" v-else-if="productsLoadingFailed">
        <h2
          :class="[
            'products__loading-text',
            { 'products__loading-error': productsLoadingFailed },
          ]"
        >
          Произошла ошибка при загрузке товаров
        </h2>
        <button class="button button--primery" @click.prevent="loadProducts">
          Попробовать ещё раз
        </button>
      </div>
      <section
        :class="[
          'catalog',
          { catalog__loading: productsLoading && products.length > 0 },
        ]"
      >
        <ProductList :products="products"></ProductList>
        <BasePagination
          v-if="products.length > 0"
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
/* eslint-disable */

import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: this.$route.params.filter || 0,
      filterColorId: 0,
      page: 1,
      productsPerPage: 6,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
            ...product,
            image: product.image.file.url,
          }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + '/api/products', {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColorId,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => (this.productsLoadingFailed = true))
          .then(() => (this.productsLoading = false));
      }, 1500);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style scoped>
.products__loading-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.products__loading-text {
  position: relative;
  padding-left: 50px;
  margin-bottom: 50px;
}
.products__loading-text::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 40px;
  height: 40px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform: translateY(-50%);
}
.products__loading-active::before {
  background-image: url('../assets/preloader.svg');
}
.products__loading-failed::before {
  background-image: url('../assets/sad.svg');
}
.products__loading-error::before {
  background-image: url('../assets/error.svg');
}
.catalog {
  position: relative;
}
.catalog::before,
.catalog::after {
  content: '';
  position: absolute;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.35s ease, visibility 0.35s ease;
}
.catalog__loading::before,
.catalog__loading::after {
  opacity: 1;
  visibility: visible;
}
.catalog__loading::before {
  top: -5px;
  right: 0;
  bottom: 0;
  left: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  border-radius: 15px;
  background-color: rgba(51, 51, 51, 0.15);
  z-index: 1;
}
.catalog__loading::after {
  top: 50%;
  left: 50%;
  width: 75px;
  height: 75px;
  background-image: url('../assets/preloader.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform: translate(-50%, -50%);
}
.content__info.hidden {
  opacity: 0;
  visibility: hidden;
}
.button--primery:hover {
  color: #333;
}
</style>
