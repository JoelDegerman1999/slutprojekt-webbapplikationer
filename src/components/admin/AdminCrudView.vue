<template>
  <div class="container">
    <ul v-if="!createForm">
      <li v-for="product in products" :key="product._id">
        {{product.title}}
        <div>
          <router-link :to="`product/${product._id}`">
            <button class="show">Show</button>
          </router-link>
          <router-link :to="`/admin/edit/product/${product._id}`">
            <button class="edit">Edit</button>
          </router-link>
          <button class="delete" @click="deleteP(product)">Delete</button>
        </div>
      </li>
    </ul>
    <div class="create">
      <button v-if="!createForm" @click="createForm = !createForm">Create</button>
      <section v-if="createForm">
        <div class="field" tabindex="1">
          <label for="title">Item title</label>
          <input name="title" type="text" placeholder="Hoodie" v-model="newProduct.title" required />
        </div>
        <div class="field" tabindex="2">
          <label for="img">Image</label>
          <select name="img" v-model="newProduct.imgFile">
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
          <label for="price">Price</label>
          <input name="price" type="text" placeholder="275" v-model="newProduct.price" required />
        </div>
        <div class="field" tabindex="4">
          <label for="sDesc">Short desc</label>
          <textarea
            name="sDesc"
            placeholder="Short description"
            v-model="newProduct.shortDesc"
            required
          ></textarea>
        </div>
        <div class="field" tabindex="5">
          <label for="lDesc">Longer desc</label>
          <textarea
            rows="5"
            name="lDesc"
            placeholder="Longer description"
            v-model="newProduct.longDesc"
            required
          ></textarea>
        </div>
        <div class="nav-btn">
          <button class="back-btn" @click="createForm =! createForm">Go back</button>
          <button class="add-btn" @click="addProduct">Add product</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AdminCrudView",
  data() {
    return {
      createForm: false,
      newProduct: {
        title: "",
        price: "",
        shortDesc: "",
        category: "clothes",
        longDesc: "",
        imgFile: "hoodie-ash.png"
      }
    };
  },
  computed: {
    ...mapState(["products"])
  },
  methods: {
    ...mapActions(["getAllProducts", "deleteProduct"]),
    deleteP(product) {
      if (!confirm("Delete product")) return;
      this.deleteProduct(product);
    },
    async addProduct() {
      await this.$store.dispatch("createProduct", this.newProduct);
      this.newProduct = {
        title: "",
        price: "",
        shortDesc: "",
        category: "clothes",
        longDesc: "",
        imgFile: "hoodie-ash.png"
      };
      this.createForm = false;
    }
  },
  mounted() {
    this.getAllProducts();
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
.container {
  padding: 2rem;
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid black;
    li {
      box-sizing: border-box;
      font-size: 1.4rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      &:nth-of-type(2n) {
        background: lightgrey;
      }
      div {
        display: flex;
        justify-content: space-between;
        width: 40rem;

        button {
          width: 10rem;
          border: none;
          color: white;
          border-radius: 5px;
          height: 2rem;
        }
        .show {
          background: #1489ab;
        }
        .edit {
          background: #43a047;
        }
        .delete {
          background: #c62828;
        }
      }
    }
  }
  .create {
    margin-top: 2rem;
    .field {
      width: 50%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }
    button {
      border: none;
      color: white;
      background-color: #43a047;
      width: 10rem;
      height: 3rem;
      border-radius: 5px;
      font-size: 1rem;
    }

    .nav-btn {
      display: flex;
      justify-content: space-between;
      width: 25rem;
      margin: 2rem auto;
      .add-btn {
        background: #43a047;
      }

      .back-btn {
        background-color: #1489ab;
      }
    }
  }
}
</style>>