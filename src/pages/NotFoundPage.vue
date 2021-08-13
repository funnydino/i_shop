<template>
  <main class="content container not__found">
    <h1>Страница не найдена</h1>
    <router-link class="to-main__link" :to="{ name: 'main' }">
      Вернуться на главную страницу
    </router-link>
  </main>
</template>

<script>
// import goToPage from '@/helpers/goToPage';

export default {
  methods: {
    // goToPage,
  },
};
</script>

<style>
main {
  position: relative;
  flex: 1 1 auto;
}

.not__found {
  text-align: center;
}

.not__found::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 250px;
  background: #fff url('../assets/404.svg') no-repeat center/contain;
  transform: translate(-50%, -50%);
}

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
