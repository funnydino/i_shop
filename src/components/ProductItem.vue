<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{
        name: 'product',
        params: { id: product.id, color: this.currentItemColor },
      }"
    >
      <img
        :src="product.image"
        :srcset="getAdaptiveImage(product.image)"
        :alt="product.title"
      />
    </router-link>

    <h3 class="catalog__title">
      <router-link
        :to="{
          name: 'product',
          params: { id: product.id, color: this.currentItemColor },
        }"
      >
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <ProductColors
      :key="'colors#' + product.id"
      :colors="product.colors"
      :product-id="product.id"
      v-model="currentItemColor"
      :className="'colors colors--black'"
    />
  </li>
</template>
<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import ProductColors from './ProductColors.vue';

export default {
  data() {
    return {
      currentItemColor: this.product.colors[0],
    };
  },
  filters: {
    numberFormat,
  },
  components: { ProductColors },
  props: ['product'],
  methods: {
    goToPage,
    getAdaptiveImage(image) {
      return image.replace('.jpg', '@2x.jpg 2x');
    },
  },
};
</script>
<style scoped>
.catalog__pic img {
  border-radius: 15px;
  box-shadow: 0 0 5px #9e9e9e;
  transition: box-shadow 0.35s ease;
}
@media (min-width: 1025px) {
  .catalog__pic img:hover {
    box-shadow: 0 0 5px #5c5c5c;
  }
}
</style>
