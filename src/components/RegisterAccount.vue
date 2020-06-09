<template>
  <div class="container">
    <h1 id="topper">Fill out the form to get skatin'!</h1>
    <section id="registerForm">
      <h1>Account Information</h1>
      <h3>{{errorMessage}}</h3>
      <div class="inputForm">
        <h2>FULL NAME</h2>
        <input type="text" v-model="name" />
      </div>
      <div class="inputForm">
        <h2>EMAIL</h2>
        <input type="text" class="email" v-model="email" />
      </div>
      <div class="inputForm" id="passwordInput">
        <h2>PASSWORD</h2>
        <input type="password" v-model="password" />
      </div>
      <div class="inputForm" id="confirmPassword">
        <h2>CONFIRM PASSWORD</h2>
        <input type="password" v-model="repeatPassword" />
      </div>
      <h1>Billing Information</h1>
      <div class="inputForm" id="city">
        <h2>CITY</h2>
        <input type="text" v-model="adress.city" />
      </div>
      <div class="inputForm">
        <h2>STREET</h2>
        <input type="text" v-model="adress.street" />
      </div>
      <div class="inputForm">
        <h2>ZIP</h2>
        <input type="text" v-model="adress.zip" />
      </div>

      <button id="registerButton" v-on:click="registerUser">REGISTER NOW!</button>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    adress: {
      street: "",
      city: "",
      zip: ""
    },
    errorMessage: ""
  }),

  methods: {
    async registerUser() {
      let userToBeRegistered = {
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword,
        name: this.name,
        adress: this.adress
      };
      try {
        await this.$store.dispatch("createNewUser", userToBeRegistered);
        this.$router.push("/");
      } catch {
        let emailField = document.querySelector(".email");
        emailField.classList.add("wrongInput");
        this.errorMessage = "Email already in use.";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-weight: 400;
  text-decoration-line: underline;
}
.wrongInput {
  border: 2px solid red;
}
.container {
  box-sizing: border-box;
  padding: 1rem;
}
#topper {
  font-size: 2rem;
  margin-top: 2.2rem;
}
#registerForm {
  margin: 0 auto;
  margin-top: 2rem;
  width: 30rem;

  input {
    width: 20rem;
  }

  h1 {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  button {
    margin-top: 3rem;
    width: 15rem;
    height: 3rem;
    font-weight: bold;
    font-size: 1.2rem;
    border: 1px solid black;
    background-color: #89c055;
  }
}

.inputForm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}
#passwordInput {
  margin-top: 3rem;
}

#confirmPassword h2 {
  font-size: 0.8rem;
}
</style>
