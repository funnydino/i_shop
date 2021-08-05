/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [{
      productId: 1000,
      amount: 2,
      color: '#73B6EA',
      capacity: '',
    }, {
      productId: 1001,
      amount: 3,
      color: '#8BE000',
      capacity: '256GB',
    }],
  },
  mutations: {
    addProductToCart(state, {
      productId,
      amount,
      color,
      capacity,
    }) {
      const item = state.cartProducts.find((el) => el.productId === productId &&
        el.color === color && el.capacity === capacity);
      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
          color,
          capacity,
        });
      }
    },
    updateCartProductAmount(state, {
      productId,
      amount,
      color,
      capacity,
    }) {
      const item = state.cartProducts.find((el) => el.productId === productId &&
        el.color === color && el.capacity === capacity);
      if (item) {
        item.amount = amount;
      } else {
        state.cartProducts.findIndex((el) => el.productId === productId);
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((el) => el.productId !== productId);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((el) => el.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item
        .amount) + acc, 0);
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => item
        .amount + acc, 0);
    },
  },
});
