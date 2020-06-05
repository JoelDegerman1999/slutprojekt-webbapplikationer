<template>
  <div class="container">
    <div class="cart-container">
      <article class="cart" v-for="item in getCart" :key="item.product._id">
        <div class="cart-first-two-columns">
          <div class="cart-image" v-if="item.product.imgFile">
            <img :src="require(`@/assets/${item.product.imgFile}`)" />
          </div>
          <div class="cart-title">
            <p>{{ item.product.title }}</p>
          </div>
        </div>

        <div class="cart-quantity">
          <img
            src="@/assets/remove-circle-outline.svg"
            @click="decreaseCount(item)"
          />
          <p>{{ item.quantity }} st</p>
          <img
            src="@/assets/add-circle-outline.svg"
            @click="increaseCount(item)"
          />
        </div>
        <div class="cart-price">
          <p>{{ getRowTotal(item) }} kr</p>
        </div>
      </article>
      <h1>Total {{ getTotal }}</h1>
    </div>
    <div class="nav-btn">
      <router-link to="/">
        <button class="cont-btn">CONTINUE SHOPPING</button>
      </router-link>
      <router-link to="/checkout">
        <button class="check-btn">CHECKOUT NOW</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeMount() {
    this.$store.dispatch("getCartFromLocalStorage");
  },
  methods: {
    increaseCount(item) {
      this.$store.commit("INCREASE_CART_QUANTITY", item);
    },
    decreaseCount(item) {
      this.$store.commit("DECREASE_CART_QUANTITY", item);
    },

    getRowTotal(item) {
      let sum = 0;
      for (let i = 0; i < item.quantity; i++) {
        sum += item.product.price;
      }
      return sum;
    },
  },
  computed: {
    getCart() {
      return this.$store.state.cart;
    },
    getTotal() {
      let cart = this.getCart;
      let sum = 0;
      cart.forEach((element) => {
        if (element.quantity > 1) {
          for (let i = 0; i < element.quantity; i++) {
            sum += element.product.price;
          }
        } else {
          sum += element.product.price;
        }
      });
      return sum;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #dedede;
  align-items: center;

  .nav-btn {
    display: flex;
    justify-content: space-between;
    width: 70%;

    button {
      height: 3.5rem;
      font-size: 1.2rem;
      width: 15rem;
      margin-top: 2rem;
    }

    .cont-btn {
      background: #1489ab;
    }
  }

  .cart-container {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr;
    grid-auto-rows: 5rem;
    gap: 1rem;
    margin-top: 4rem;
    width: 70%;
    height: 70%;
    background: white;

    article.cart {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      // background: violet;
      padding: 3rem;
      width: 100%;
      height: 100%;

      .cart-first-two-columns {
        display: flex;

        .cart-image {
          img {
            height: 2rem;
          }
        }
        .cart-title {
          padding-left: 2rem;
        }
      }

      .cart-quantity {
        display: flex;

        img {
          padding: 0.1rem;
          height: 1.2rem;
        }
        p {
          color: black;
        }
      }
      // .cart-price {

      // }
    }
  }
}
</style>
