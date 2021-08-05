<template>
  <fieldset class="form__block">
    <legend class="form__legend">Объем в ГБ:</legend>

    <ul class="sizes sizes--primery">
      <li class="sizes__item" v-for="el of capacities" :key="'capacity#' + el">
        <label class="sizes__label">
          <input
            class="sizes__radio sr-only"
            type="radio"
            name="sizes-item"
            :value="el"
            v-model="currentItemCapacity"
            @change="changeProductCapacity"
          />
          <span class="sizes__value"> {{ el }} </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
export default {
  data() {
    return {
      currentItemCapacity: this.currentCapacity,
    };
  },
  model: {
    prop: 'currentCapacity',
    event: 'capacity-change',
  },
  props: ['capacities', 'productId', 'currentCapacity'],
  methods: {
    changeProductCapacity() {
      this.$emit('capacity-change', this.currentItemCapacity);
    },
  },
  watch: {
    currentCapacity(value) {
      this.currentItemCapacity = value;
    },
  },
};
</script>

<style>
</style>
