<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info product__info--color" v-if="color">
      Цвет:
      <span class="colors__value" :style="'background-color: ' + color"> </span>
    </p>
    <p class="product__info product__info--capacity" v-if="capacity">
      Объем: <span>{{ capacity }}</span>
    </p>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <div class="product__counter form__counter">
      <button
        class="amount-btn"
        type="button"
        aria-label="Убрать один товар"
        :disabled="amount > 1 ? false : true"
        @click.prevent="amount--"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input readonly type="text" v-model.number="amount" name="count" />

      <button
        class="amount-btn"
        type="button"
        aria-label="Добавить один товар"
        @click.prevent="amount++"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';

export default {
  props: ['item', 'color', 'capacity'],
  filters: {
    numberFormat,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
          color: this.item.color,
          capacity: this.item.capacity,
        });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>

<style scoped>
.amount-btn {
  height: 100%;
  cursor: pointer;
  transition: background-color 0.35s ease;
}
.amount-btn:hover {
  background-color: #e7e7e7;
}
.amount-btn:active {
  background-color: #dadada;
}
.amount-btn:disabled {
  cursor: not-allowed;
}

.product__info--color {
  grid-row: 1/4;
}

.product__info--capacity {
  grid-row: 2/5;
}

.product__info--color .colors__value {
  padding-left: 0;
  margin-left: 5px;
  vertical-align: middle;
  box-shadow: 0 0 3px #bebebe;
}
</style>
