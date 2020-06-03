<template>
  <nav>
   <router-link to="/">
    <img src="@/assets/sinus-logo.svg" class="logo" />
   </router-link>
    <div class="navigation">
      <div class="nav-btn">
        <router-link to="/login/account">
          <button class="login">Login</button>
        </router-link>
        <router-link to="/about">
          <button class="about">About</button>
        </router-link>
        <router-link to="/cart">
          <button>
            <img src="@/assets/icon-bag-white.svg" class="cart" />
          </button>
        </router-link>
      </div>
      <div class="profile">
        <router-link to="/profile">
          <img src="@/assets/person-24px.svg" alt="" />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
button {
  outline: none;
  border: none;
  background-color: #24252a;
  color: #fff;
  font-size: 1.5rem;
}

nav {
  background-color: #24252a;
  padding: 0 5rem;
  margin-bottom: 2rem;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 172px;
  }
  .navigation {
    width: 33rem;
    display: flex;
    justify-content: space-between;
    .nav-btn {
      width: 22rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .about {
        background-color: #1489ab;
        width: 10rem;
        height: 3rem;
        border-radius: 50px;
      }
      .cart {
        width: 2rem;
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
