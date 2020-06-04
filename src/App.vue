<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
* {
  font-family: "Raleway", sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6rem;
}
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
