<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="(product, index) in products" :key="index">
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
            <span class="colors__value" style="background-color: #222"> </span>
          </label>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["products"],
  methods: {
    getAdaptiveImage(image) {
      return image.replace(".jpg", "@2x.jpg 2x");
    },
  },
};
</script>

<style>
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
