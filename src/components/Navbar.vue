<template>
  <nav>
    <router-link to="/">
      <img src="@/assets/sinus-logo.svg" class="logo" />
    </router-link>
    <div class="navigation">
      <div class="nav-btn">
        <router-link to="/login/account" v-if="!this.$store.state.user">
          <button class="login">LOGIN</button>
        </router-link>
        <router-link to="/logout" v-if="this.$store.state.user">
          <button class="login">LOGOUT</button>
        </router-link>
        <router-link to="/about">
          <button class="about">ABOUT</button>
        </router-link>
        <router-link to="/cart">
          <button>
            <p id="cartItemCounter">{{cartItems}}</p>
            <img src="@/assets/icon-bag-white.svg" class="cart" />
          </button>
        </router-link>
      </div>
      <div class="profile">
        <router-link to="/profile">
          <img src="@/assets/person-24px.svg" />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    cartItems() {
      let counter = 0;
      this.$store.state.cart.forEach(element => {
        counter += element.quantity;
      });
      return counter;
    }
  }
};
</script>

<style lang="scss" scoped>
#cartItemCounter {
  position: relative;
  background-color: #1489ab;
  border-radius: 50px;
  width: 2rem;
  bottom: 1rem;
  left: 5rem;
  z-index: 1;
}

button {
  outline: none;
  border: none;
  background-color: #24252a;
  color: #fff;
  font-size: 1rem;
}

nav {
  background-color: #24252a;
  padding: 0 5rem;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 172px;
  }
  .navigation {
    width: 36rem;
    display: flex;
    justify-content: space-between;
    .nav-btn {
      width: 25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .about {
        background-color: #1489ab;
        width: 10rem;
        height: 3rem;
        border-radius: 50px;
        letter-spacing: 0.3rem;
      }
      .login {
        letter-spacing: 0.3rem;
      }
      .cart {
        width: 2rem;
        position: relative;
        bottom: 2rem;
      }
    }
    .profile {
      background: white;
      height: 3.8rem;
      width: 3.8rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 2.5rem;
      }
    }
  }
}
</style>
