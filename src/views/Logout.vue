<template>
  <div class="container">
    <h1>You are logged out</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push("/");
    }, 2000);
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 2rem;
}
</style>