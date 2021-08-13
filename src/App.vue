<template>
  <div class="page">
    <PageHeader />

    <router-view />

    <PageFooter />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter,
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  /* overflow: hidden; */
}
</style>
