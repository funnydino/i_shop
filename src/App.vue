<template>
  <section class="catalog">
    <ul class="catalog__list">
      <li
        class="catalog__item"
        v-for="(product, index) in products"
        :key="index"
      >
        <a class="catalog__pic" href="#">
          <img
            :src="product.image"
            :srcset="getAdaptiveImage(product.image)"
            :alt="product.title"
          />
        </a>

        <h3 class="catalog__title">
          <a href="#"> {{ product.title }} </a>
        </h3>

        <span class="catalog__price">
          {{ new Intl.NumberFormat("ru").format(product.price) }} ₽
        </span>

        <ul class="colors colors--black">
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color-1"
                value="#73B6EA"
                checked=""
              />
              <span class="colors__value" style="background-color: #73b6ea">
              </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color-1"
                value="#8BE000"
              />
              <span class="colors__value" style="background-color: #8be000">
              </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color-1"
                value="#222"
              />
              <span class="colors__value" style="background-color: #222">
              </span>
            </label>
          </li>
        </ul>
      </li>
    </ul>

    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a
          class="
            pagination__link pagination__link--arrow pagination__link--disabled
          "
          aria-label="Предыдущая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--current"> 1 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 2 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 3 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 4 </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> ... </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#"> 10 </a>
      </li>
      <li class="pagination__item">
        <a
          class="pagination__link pagination__link--arrow"
          href="#"
          aria-label="Следующая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
// eslint-disable-next-line
import products from "./data/products";

export default {
  // eslint-disable-next-line
  name: "App",
  data() {
    return {
      products,
    };
  },
  methods: {
    getAdaptiveImage(image) {
      // eslint-disable-next-line
      return image.replace(".jpg", "@2x.jpg 2x");
    },
  },
};
</script>
