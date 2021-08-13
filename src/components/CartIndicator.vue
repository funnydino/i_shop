<template>
  <router-link
    :class="[
      'header__cart',
      { 'header__cart--loading': this.$store.state.cartParams.cartUpdate },
    ]"
    :to="{ name: 'cart' }"
    aria-label="Корзина с товарами"
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">
      {{ $store.state.cartProducts.length }}
    </span>
  </router-link>
</template>

<script>
export default {};
</script>

<style scoped>
.header__cart--loading svg,
.header__cart--loading span {
  display: none;
}
.header__cart--loading {
  background-color: transparent;
  background-image: url('../assets/preloader_green.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
