<template>
  <div class="container">
    <section class="background" />
    <section class="product-container">
      <div v-if="loading">loadig....</div>
      <article class="product" v-for="product in products" :key="product._id">
        <div class="product-img">
          <img :src="require(`@/assets/${product.imgFile}`)" />
        </div>
        <div class="product-info">
          <h2>{{ product.title }}</h2>
          <h3>{{ product.price }} kr</h3>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState(["products"]),
  },
  methods: { ...mapActions(["getAllProducts"]) },
  async mounted() {
    this.loading = true;
    await this.getAllProducts();
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
h2,
h3 {
  font-weight: 500;
}
.container {
  height: 100%;
  .background {
    height: 60%;
    background-image: url("../assets/skate-hero-1.jpg");
    background-size: cover;
    background-position: center;
  }
  .product-container {
    padding: 2rem 6rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 350px;
    gap: 5rem;
    .product {
      width: 100%;
      .product-img {
        background-color: #c4c4c4;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 75%;
        img {
          width: 85%;
        }
      }
      .product-info {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>
