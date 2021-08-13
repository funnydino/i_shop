<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info" v-show="products.length !== 0">
        Количество товаров: {{ totalAmount }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <h2
            v-show="
              products.length === 0 && this.$store.state.cartParams.cartUpdated
            "
            class="cart__field-text cart__field-text--updated"
          >
            Корзина пуста.<br />Добавьте товар для продолжения оформления
            заказа.
          </h2>
          <h2
            v-show="this.$store.state.cartParams.cartUpdate"
            class="cart__field-text cart__field-text--update"
          >
            Выполняется загрузка товаров...
          </h2>
          <ul class="cart__list">
            <CartItem
              v-for="item in products"
              :key="item.productId"
              :item="item"
              :color="item.color"
              :capacity="item.capacity ? item.capacity : ''"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';

export default {
  components: { CartItem },
  filters: {
    numberFormat,
  },
  methods: {
    reduceAmount() {
      this.$store.commit('reduceProductAmount', {
        productId: this.item.product.id,
        amount: this.item.amount,
      });
    },
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalAmount: 'cartTotalAmount',
    }),
  },
};
</script>

<style scoped>
.cart__field-text {
  position: relative;
  padding-left: 50px;
  margin-bottom: 50px;
}
.cart__field-text::before {
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
.cart__field-text--update::before {
  background-image: url('../assets/preloader.svg');
}
.cart__field-text--updated::before {
  background-image: url('../assets/sad.svg');
}
</style>
