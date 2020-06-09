<template>
  <div class="container">
    <section class="order-info">
      <h1 class="title">YOUR ORDER</h1>
      <div class="order" v-for="item in cart" :key="item.product._id">
        <div class="name field">
          <h2>{{ item.product.title }}</h2>
        </div>
        <div class="amount">
          <h2>{{ item.quantity }} st</h2>
        </div>
        <div class="price">
          <h2>{{ getRowTotal(item) }} kr</h2>
        </div>
      </div>
      <div class="total">
        <h2>Total</h2>
        <h2>{{ getTotal }} kr</h2>
      </div>
      <article class="address">
        <div class="billing">
          <h1>BILLING ADDRESS</h1>
          <h3>Testvägen4</h3>
          <h3>121 23</h3>
          <h3>Testberga</h3>
        </div>
        <div class="shipping">
          <h1>SHIPPING ADDRESS</h1>
          <h3>Testvägen4</h3>
          <h3>121 23</h3>
          <h3>Testberga</h3>
        </div>
      </article>
      <div class="nav-btn">
        <router-link to="/cart">
          <button class="back-btn">BACK</button>
        </router-link>
        <button class="order-btn" @click="placeOrder">PLACE ORDER</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["cart"]),
    getTotal() {
      let cart = this.cart;
      let sum = 0;
      cart.forEach(element => {
        if (element.quantity > 1) {
          for (let i = 0; i < element.quantity; i++) {
            sum += element.product.price;
          }
        } else {
          sum += element.product.price;
        }
      });
      return sum;
    }
  },
  methods: {
    getRowTotal(item) {
      let sum = 0;
      for (let i = 0; i < item.quantity; i++) {
        sum += item.product.price;
      }
      return sum;
    },
    async placeOrder() {
      let cartItems = this.cart;
      console.log("before");
      try {
        await this.$store.dispatch("placeOrder", cartItems);
        // this.$router.push("/");
      } catch {
        this.$router.push("/login/account");
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("getCartFromLocalStorage");
  }
};
</script>

<style lang="scss" scoped>
h2 {
  font-weight: 400;
}
.container {
  padding: 2rem;

  .title {
    margin-bottom: 4rem;
    font-size: 2.5rem;
    letter-spacing: 0.2rem;
  }

  .order-info {
    padding: 0 12rem;

    .order {
      margin-bottom: 2rem;
      letter-spacing: 0.15rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .name {
        text-align: left;
      }
      .amount {
        text-align: right;
        padding-right: 42%;
      }
      .price {
        text-align: right;
      }
    }
    .total {
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      margin-top: 2rem;
      padding: 1rem 0;
      letter-spacing: 0.15rem;
      display: flex;
      justify-content: space-between;
      h2 {
        font-weight: 700;
      }
    }
    .address {
      margin-top: 4rem;
      display: flex;
      justify-content: center;
      .billing {
        h3 {
          font-weight: 400;
        }
        margin-right: 2rem;
      }
      .shipping {
        h3 {
          font-weight: 400;
        }
        margin-left: 2rem;
      }
    }
    .nav-btn {
      display: flex;
      justify-content: space-between;
      width: 60%;
      margin: 0 auto;
      button {
        margin-top: 5rem;
        font-size: 1.3rem;
        width: 17rem;
        height: 4rem;
      }
      .back-btn {
        background-color: #1489ab;
      }
    }
  }
}
</style>
