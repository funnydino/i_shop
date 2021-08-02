<template>
  <li class="catalog__item">
    <a
      class="catalog__pic"
      href="#"
      @click.prevent="
        goToPage('product', {
          id: product.id,
        })
      "
    >
      <img
        :src="product.image"
        :srcset="getAdaptiveImage(product.image)"
        :alt="product.title"
      />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <ProductColors
      :key="'colors#' + product.id"
      :colors="product.colors"
      :product-id="product.id"
      v-model="currentItemColor"
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
