/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {
  API_BASE_URL
} from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartParams: {
      cartUpdate: false,
      cartUpdated: false,
    },
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, {
      productId,
      amount,
    }) {
      const item = state.cartProducts.find((el) => el.productId === productId);
      if (item) {
        item.amount = amount;
      } else {
        state.cartProducts.findIndex((el) => el.productId === productId);
      }
    },
    cartStatusUpdate(state, cartParams) {
      state.cartParams.cartUpdate = cartParams.cartUpdate;
      state.cartParams.cartUpdated = cartParams.cartUpdated;
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId)
          .product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item
        .amount) + acc, 0);
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => item
        .amount + acc, 0);
    },
    deliveryCost(state, getters) {
      const cost = Math.ceil(getters.cartTotalPrice / 10000) * 100;
      return (cost > 0 && cost < 500) ? 500 : cost;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then(response =>
          context.commit('updateOrderInfo', response.data));
    },
    loadCart(context) {
      context.commit('cartStatusUpdate', {
        cartUpdate: true,
        cartUpdated: false
      });
      return (new Promise(resolve => setTimeout(resolve, 1500)))
        .then(() => {
          return axios.get(API_BASE_URL + '/api/baskets', {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }).then((response) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem('userAccessKey', response.data.user.accessKey);
              context.commit('updateUserAccessKey', response.data.user.accessKey);
            };
            context.commit('cartStatusUpdate', {
              cartUpdate: false,
              cartUpdated: true
            });
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          });
        })
    },
    addProductToCart(context, {
      productId,
      amount,
    }) {
      return (new Promise(resolve => setTimeout(resolve, 1500)))
        .then(() => {
          return axios
            .post(API_BASE_URL + '/api/baskets/products', {
              productId,
              quantity: amount
            }, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },
    updateCartProductAmount(context, {
      productId,
      amount,
    }) {
      context.commit('updateCartProductAmount', {
        productId,
        amount,
      });
      if (amount < 1) {
        return;
      };
      return axios
        .put(API_BASE_URL + '/api/baskets/products', {
          productId,
          quantity: amount
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteProductFromCart(context, {
      productId
    }) {
      return (new Promise(resolve => setTimeout(resolve, 1000)))
        .then(() => {
          return axios
            // .delete(API_BASE_URL + '/api/baskets/products', {productId,}, {
            //   params: {
            //     userAccessKey: context.state.userAccessKey,
            //   },
            // })
            // .then((response) => {
            //   context.commit('updateCartProductsData', response.data.items);
            //   context.commit('syncCartProducts');
            // });
            .request({
              url: API_BASE_URL + '/api/baskets/products',
              method: 'delete',
              params: {
                userAccessKey: context.state.userAccessKey,
              },
              data: {
                productId,
              },
            })
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },
  },
});
