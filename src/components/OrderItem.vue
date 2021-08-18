<template>
  <li class="cart__order">
    <h3>{{ title }}</h3>
    <b>{{ totalPrice | numberFormat }} ₽</b>
    <span>Количество: {{ amount }}</span>
    <span>Артикул: {{ id }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['title', 'price', 'amount', 'id'],
  filters: { numberFormat },
  computed: {
    totalPrice() {
      return +this.price * +this.amount;
    },
  },
};
</script>

<style>
</style>
