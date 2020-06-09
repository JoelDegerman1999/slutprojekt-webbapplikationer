<template>
  <section class="product">
    <img v-if="product.imgFile" :src="require('@/assets/' + product.imgFile)" class="product-img" />
    <div class="product-info">
      <div class="field" tabindex="1">
        <label>Item title</label>
        <input type="text" placeholder="Hoodie" v-model="product.title" required />
      </div>
      <div class="field" tabindex="2">
        <label>Image</label>
        <select v-model="product.imgFile">
          <option value="hoodie-ash.png" selected="selected">Hoodie ash</option>
          <option value="hoodie-fire.png">Hoodie fire</option>
          <option value="hoodie-ocean.png">Hoodie ocean</option>
          <option value="skateboard-generic.png">Skateboard generic</option>
          <option value="skateboard-greta.png">Skateboard greta</option>
          <option value="wheel-rocket.png">Wheel rocket</option>
          <option value="wheel-spinner.png">Wheel spinner</option>
          <option value="wheel-wave.png">Wheel wave</option>
        </select>
      </div>
      <div class="field" tabindex="3">
        <label>Price</label>
        <input type="text" placeholder="275" v-model="product.price" required />
      </div>
      <div class="field" tabindex="4">
        <label>Short desc</label>
        <textarea placeholder="Short description" v-model="product.shortDesc" required></textarea>
      </div>
      <div class="field" tabindex="5">
        <label>Longer desc</label>
        <textarea
          rows="5"
          name="lDesc"
          placeholder="Longer description"
          v-model="product.longDesc"
          required
        ></textarea>
      </div>
      <button @click="update">Update</button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ProductEditComponent",
  data() {
    return {
      newProduct: {}
    };
  },
  methods: {
    ...mapActions(["getProduct"]),
    ...mapActions(["updateProduct"]),
    async update() {
      try {
        await this.updateProduct(this.product);
        this.$router.push("/admin");
      } catch {
        this.$store.dispatch("logout");
        this.$router.push("/login/account");
      }
    }
  },
  computed: {
    ...mapState(["product"])
  },

  async mounted() {
    await this.getProduct(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
*:focus {
  outline: none;
}
input {
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem;
}
select {
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem;
}

textarea {
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 5px;
}

button {
  margin-top: 1rem;
  border: none;
  outline: none;
  color: white;
  background-color: #1489ab;
  width: 12rem;
  height: 3rem;
  border-radius: 5px;
  letter-spacing: 0.1rem;
  font-size: 1.3rem;
  font-weight: 600;
}
.product {
  display: flex;
  justify-content: center;
  align-items: center;
  .product-img {
    width: 20%;
    height: 20%;
  }
  .product-info {
    margin-top: 5rem;
    margin-left: 2rem;
    text-align: left;
    width: 40rem;
    p {
      margin: 1rem 0;
    }

    .field {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>