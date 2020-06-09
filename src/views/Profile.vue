<template>
  <section>
    <div id="profileContainer" v-if="currentUser != null">
      <div id="profilePicture"></div>
      <h1>{{currentUser.name}}</h1>
      <h2>{{currentUser.email}}</h2>
      <router-link to="/admin" v-if="currentUser.role == 'admin'">
        <button class="admin">Admin page</button>
      </router-link>
      <div class="adressInformation">
        <h1 class="shippingAdress">SHIPPING ADRESS</h1>
        <h3>{{currentUser.adress.street}}</h3>
        <h3>{{currentUser.adress.zip}}</h3>
        <h3>{{currentUser.adress.city}}</h3>
      </div>
      <h1>ORDER HISTORY</h1>
      <div class="orderHistory" v-if="orders != undefined">
        <div v-for="(order, index) in orders" v-bind:key="order._id + index" class="order">
          <div class="orderFormat">
            <h4>ID: {{order._id}}</h4>
            <h4>{{new Date(order.timeStamp).toISOString().substring(0, 10)}}</h4>
          </div>

          <div v-for="(orderItem, index) in computedOrders[index]" v-bind:key="index">
            <div class="orderFormat">
              <p>{{orderItem.title}}</p>
              <p>{{orderItem.price}} kr</p>
            </div>
          </div>
          <div class="orderFormat">
            <h3>TOTAL:</h3>
            <h3>{{order.orderValue}} kr</h3>
          </div>
        </div>
      </div>
      <div v-else>You have no placed orders.</div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    orders: [],
    computedOrders: []
  }),

  methods: {
    async getCurrentItem(productId) {
      let prod = await this.$store.dispatch("readProduct", productId);
      return prod;
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    getOrderHistory() {
      return this.$store.state.orderHistory;
    }
  },
  async beforeCreate() {
    await this.$store.dispatch("getOrders");

    let currentUser = this.$store.state.user;
    if (currentUser == null) {
      this.$router.push("/login/account");
      return;
    }
    this.orders = this.getOrderHistory;
    //undefined == användaren har inga ordrar
    if (this.orders != undefined) {
      for (let i = 0; i < this.orders.length; i++) {
        this.computedOrders.push([]);
        for (let j = 0; j < this.orders[i].items.length; j++) {
          this.computedOrders[i].push(
            await this.$store.dispatch("readProduct", this.orders[i].items[j])
          );
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.admin {
  margin-top: 0;
  margin-bottom: 2rem;
}

#profileContainer {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #profilePicture {
    width: 15rem;
    height: 15rem;
    border-radius: 30rem;
    border: 2px solid gray;
    background-color: whitesmoke;
    margin-bottom: 2rem;
  }

  .shippingAdress {
    font-size: 2rem;
  }

  .adressInformation {
    margin-bottom: 2rem;
  }

  .orderFormat {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order {
    border-bottom: 5px solid black;
    width: 20rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    margin-bottom: 2rem;
  }
}
</style>
