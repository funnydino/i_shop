<template>
  <main
    class="content container product__load product__load-loading"
    v-if="productLoading"
  >
    <h2>Загрузка товара...</h2>
  </main>
  <main
    class="content container product__load not__found"
    v-else-if="!productData"
  >
    <h2>Не удалось загрузить товар</h2>
    <router-link class="to-main__link" :to="{ name: 'main' }">
      Вернуться на главную страницу
    </router-link>
  </main>
  <main class="content container" v-else-if="productData">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{ name: 'main', params: { filter: product.category.id } }"
          >
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ product.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image.file.url"
            :alt="product.title"
          />
        </div>
        <!-- <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img
                width="98"
                height="98"
                src="img/phone-square-1.jpg"
                srcset="img/phone-square-1@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img
                width="98"
                height="98"
                src="img/phone-square-2.jpg"
                srcset="img/phone-square-2@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img
                width="98"
                height="98"
                src="img/phone-square-3.jpg"
                srcset="img/phone-square-3@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a class="pics__link" href="#">
              <img
                width="98"
                height="98"
                src="img/phone-square-4.jpg"
                srcset="img/phone-square-4@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
        </ul> -->
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="addToCart"
          >
            <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ProductColors
                :key="'colors#' + product.id"
                :colors="product.colors"
                :product-id="product.id"
                v-model="currentItemColor"
                :className="'colors'"
              />
            </fieldset>

            <ProductCapacity
              v-if="product.capacity"
              :capacities="product.capacity"
              :product-id="product.id"
              v-model="currentItemCapacity"
            />

            <div class="item__row">
              <div class="form__counter">
                <button
                  class="amount-btn"
                  type="button"
                  aria-label="Убрать один товар"
                  :disabled="productAmount > 1 ? false : true"
                  @click.prevent="productAmount--"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input
                  readonly
                  type="text"
                  v-model.number="productAmount"
                  name="count"
                />

                <button
                  class="amount-btn"
                  type="button"
                  aria-label="Добавить один товар"
                  @click.prevent="productAmount++"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button
                class="button button--primery"
                :class="{ 'btn-sending': productAddSending }"
                type="submit"
                :disabled="productAddSending"
              >
                <span v-show="!productAddSending">В корзину</span>
              </button>
            </div>
            <div v-show="productAddSending">
              Добавляем товар товар в корзину...
            </div>
            <div v-show="productAdded">Товар добавлен в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Описание </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Характеристики </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Гарантия </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Оплата и доставка </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br />
            Синхронизация со смартфоном<br />
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br />
            Поддержка сторонних приложений<br />
          </p>

          <a href="#"> Все характеристики </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет
            оптимизировать свои велотренировки, сделав их максимально
            эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по
            ANT+, объединяя полученную с них информацию. Данные отображаются на
            дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и
            различные приложения сторонних разработчиков. Велокомпьютер точно
            отслеживает местоположение, принимая сигнал с целого комплекса
            спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства
            составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты
            смартфона. Корпус гаджета выполнен из черного пластика. На
            обращенной к пользователю стороне расположен дисплей диагональю 56
            мм. На дисплей выводятся координаты и скорость, а также полученная
            со смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д. &lpar;датчики
            не входят в комплект поставки&rpar;. Корпус велокомпьютера имеет
            степень защиты от влаги IPX7. Это означает, что устройство не боится
            пыли, а также выдерживает кратковременное &lpar;до 30 минут&rpar;
            погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
/* eslint-disable */
// import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import ProductColors from '@/components/ProductColors.vue';
import ProductCapacity from '@/components/ProductCapacity.vue';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      currentItemColor: '',
      currentItemCapacity: '',
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
    };
  },
  components: {
    ProductColors,
    ProductCapacity,
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
  },
  mounted() {},
  methods: {
    // goToPage,
    ...mapActions(['addProductToCart']),
    addToCart() {
      (this.productAdded = false),
        (this.productAddSending = true),
        this.addProductToCart({
          productId: this.product.id,
          amount: this.productAmount,
          // color: this.currentItemColor,
          // capacity: this.currentItemCapacity,
        }).then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(API_BASE_URL + '/api/products/' + this.$route.params.id)
        .then((response) => (this.productData = response.data))
        .then(
          () =>
            (this.currentItemColor =
              this.$route.params.color || this.product.colors[0].code),
        )
        .catch(() => (this.productLoadingFailed = true))
        .then(() => (this.productLoading = false));
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.product__load {
  text-align: center;
}
.product__load-loading::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 65px;
  height: 65px;
  background: #fff url('../assets/preloader.svg') no-repeat center/contain;
  transform: translate(-50%, -50%);
}
.item__row {
  margin-bottom: 10px;
}
.amount-btn {
  cursor: pointer;
  transition: background-color 0.35s ease;
}
.amount-btn:hover {
  background-color: #dadada;
}
.amount-btn:active {
  background-color: #d1d1d1;
}
.amount-btn:disabled {
  cursor: not-allowed;
}
.pics__wrapper img {
  max-height: 570px;
}
.button--primery.btn-sending {
  background-color: #fff;
  background-image: url('../assets/preloader.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50px auto;
  cursor: not-allowed;
}
.btn-sending:disabled {
  opacity: 1;
}
</style>
