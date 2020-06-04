<template>
  <div class="container">
    <ProductComponent :product="product" @addToCart="addToCart" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ProductComponent from "../components/ProductComponent";
export default {
  components: {
    ProductComponent
  },
  data() {
    return {
      loading: false,
      quantity: 1
    };
  },
  computed: {
    ...mapState(["product"])
  },
  methods: {
    ...mapActions(["getProduct"]),
    addToCart() {
      let cartItem={
       product: this.product,
       quantity:this.quantity
      }
      this.$store.commit("ADD_TO_CART", cartItem);
    },
  },
  async mounted() {
    this.loading = true;
    await this.getProduct(this.$route.params.id);
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
h1 {
  letter-spacing: 0.2rem;
  font-weight: 600;
}
h2 {
  letter-spacing: 0.2rem;
  font-weight: 500;
}

.container {
  padding: 4rem;
}
</style>
