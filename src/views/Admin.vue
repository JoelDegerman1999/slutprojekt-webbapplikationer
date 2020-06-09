<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Admin",
  beforeMount() {
    let user = this.$store.state.user;
    console.log(user);
    if (user == null || user.role != "admin") {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
