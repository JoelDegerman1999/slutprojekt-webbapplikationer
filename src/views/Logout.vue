<template>
  <div class="container">
    <h1>You are logged out</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("logout");
    setTimeout(() => {
      this.$router.push("/");
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 2rem;
}
</style>