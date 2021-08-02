<template>
  <main class="content container">
    <h1>Страница не найдена</h1>
    <a class="to-main__link" href="#" @click.prevent="goToPage('main')">
      Вернуться на главную страницу
    </a>
  </main>
</template>

<script>
import goToPage from '@/helpers/goToPage';

export default {
  methods: {
    goToPage,
  },
};
</script>

<style scoped>
.to-main__link {
  position: relative;
}

.to-main__link,
.to-main__link:visited {
  color: #333;
}

.to-main__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 1px;
  background-color: #333;
  transition: width 0.35s ease;
}

.to-main__link:hover::after {
  width: 100%;
}
</style>
