<template>
  <ul :class="className">
    <li
      class="colors__item"
      v-for="color in colors"
      :key="productId + color.id"
    >
      <label class="colors__label" :title="color.title">
        <input
          class="colors__radio sr-only"
          type="radio"
          :name="'colors#' + productId"
          :value="color.code"
          v-model="currentItemColor"
          @change="changeProductColor"
        />
        <span class="colors__value" :style="'background-color: ' + color.code">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      currentItemColor: this.currentColor,
    };
  },
  model: {
    prop: 'currentColor',
    event: 'color-change',
  },
  props: ['colors', 'productId', 'currentColor', 'className'],
  methods: {
    changeProductColor() {
      this.$emit('color-change', this.currentItemColor);
    },
  },
  watch: {
    currentColor(value) {
      this.currentItemColor = value;
    },
  },
};
</script>

<style scoped>
.colors__value {
  box-shadow: 0 0 3px #bebebe;
}
</style>
