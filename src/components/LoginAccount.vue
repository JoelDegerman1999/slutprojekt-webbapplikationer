<template>
  <div id="main">
    <section class="loginForm">
      <div v-if="statusCode != 200">ERROR</div>
      <div class="input-container">
        <h1>Already a skater? Login to proceed.</h1>
        <div class="emailInput field">
          <h2>EMAIL</h2>
          <input type="text" v-model="email" />
        </div>
        <div class="passwordInput field">
          <h2>PASSWORD</h2>
          <input type="password" v-model="password" />
        </div>
        <h3 id="errorMessage">{{errorMessage}}</h3>
        <div class="buttons">
          <button id="loginButton" v-on:click="loginUser">LOGIN</button>
          <p>Not a user yet?</p>
          <router-link to="register">
            <button id="registerButton">REGISTER</button>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    errorMessage: "",

    statusCode: 200
  }),

  methods: {
    async loginUser() {
      let userCredentials = {
        email: this.email,
        password: this.password
      };

      let statusCode = await this.$store.dispatch("login", userCredentials);
      if (statusCode == 200) {
        this.$router.push("/");
      } else {
        let inputFields = document.querySelectorAll("input");
        inputFields.forEach(element => {
          element.classList.add("wrongInput");
        });
        this.errorMessage = "Incorrect email or password.";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  background-color: whitesmoke;
  box-shadow: none;
  border: 1px solid gray;
  height: 2.3rem;
  width: 30rem;
  font-size: 1.2rem;

  transition: all 0.2s;
}

input:focus {
  transform: scale(1.02);
}

.wrongInput {
  border: 2px solid red;
}

h2 {
  font-size: 2.3rem;
}

h1 {
  font-size: 2rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  button {
    width: 12rem;
    height: 3rem;
    font-size: 1.4rem;
  }

  #loginButton {
    margin-bottom: 2rem;
  }

  #registerButton {
    background-color: #1489ab;
  }
}

.field {
  display: flex;
  flex-direction: column;
}

.loginForm {
  margin: 0 auto;
  margin-top: 5rem;
  width: 45rem;
}

.input-container {
  text-align: center;
}

.emailInput {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
  h2 {
    margin-bottom: 1rem;
  }
}

.passwordInput {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  h2 {
    margin-bottom: 1rem;
  }
}

#errorMessage {
  color: red;
  font-weight: bold;
}
</style>
