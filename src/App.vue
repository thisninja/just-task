<template>
  <div class="app__wrapper">
    <div class="app__container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
.app {
  &__wrapper {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 500px;
    margin: 100px auto;
    text-align: center;
  }
}
</style>
