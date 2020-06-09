<template>
  <div class="container">
    <h1>You are logged out</h1>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("logout");
    setTimeout(() => {
      this.$router.push("/");
    }, 1500);
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 2rem;
}
</style>