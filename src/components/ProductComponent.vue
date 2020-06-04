<template>
  <section class="product">
    <img v-if="product.imgFile" :src="require('@/assets/' + product.imgFile)" class="product-img" />
    <div class="product-info">
      <h1>{{ product.title }}</h1>
      <h2>{{ product.price }} kr</h2>
      <p>{{ product.shortDesc }}</p>

      <p>{{ product.longDesc }}</p>
      <div class="buy">
        <button @click="addToCart">ADD TO CART</button>
        <div>
          <label>Quantity:</label>
          <input type="text" v-model="quantity" />
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  props: {
    product: Object
  },
  data() {
    return {
      quantity: 1
    };
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.quantity);
    }
  }
};
</script>


<style lang="scss" scoped>
.product {
  display: flex;
  justify-content: center;
  .product-img {
    width: 30%;
  }
  .product-info {
    margin-top: 5rem;
    margin-left: 2rem;
    text-align: left;
    width: 40rem;
    p {
      margin: 1rem 0;
    }
    .buy {
      display: flex;
      align-items: center;
      div {
        margin-left: 2rem;
        display: flex;
        input {
          margin-left: 0.5rem;
          border: none;
          outline: none;
          width: 3rem;
          border: 1px solid rgba(0, 0, 0, 0.3);
          border-radius: 2px;
          text-align: center;
          font-size: 1.5rem;
        }
      }
      button {
        border: none;
        outline: none;
        color: white;
        background-color: #1489ab;
        width: 12rem;
        height: 3rem;
        border-radius: 50px;
        letter-spacing: 0.3rem;
        font-size: 0.9rem;
        font-weight: 600;
      }
    }
  }
}
</style>