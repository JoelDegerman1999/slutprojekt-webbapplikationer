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
  font-family: "Montserrat", sans-serif;
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
button {
  outline: none;
  border: none;
  width: 10rem;
  border: none;
  color: white;
  background: #43a047;
  border-radius: 2px;
  height: 2rem;
  transition: all 0.2s ease;
  cursor: pointer;
  &:active {
    opacity: 0.6;
  }
}
</style>
