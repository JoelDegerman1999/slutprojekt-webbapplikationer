<template>
  <div id="main">
    
    <section class="loginForm">
      <div v-if="statusCode != 200">ERROR</div>
      <h1>Already a skater? Login to proceed.</h1>
      <div class="emailInput">
        <h2>EMAIL</h2>
        <input type="text" v-model= "email">        
      </div>   
      <div class="passwordInput">
        <h2>PASSWORD</h2>   
        <input type="password" v-model= "password">
      </div>
      <div class="buttons">
        <button id="loginButton" v-on:click= "loginUser">LOGIN</button>
        <p>Not a user yet?</p>
        <router-link to="register"><button id="registerButton">REGISTER</button></router-link>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  data:() => ({
    email: '',
    password: '',

    statusCode: 200,
  }),

  methods:{
    async loginUser(){
      let userCredentials = {
        email: this.email,
        password: this.password
      }
      
      let statusCode = await this.$store.dispatch('login', userCredentials);
      if(statusCode == 200){
        this.$router.push("/");
      }
    }
  }
  
};
</script>

<style lang="scss" scoped>
input{
  background-color: whitesmoke;
  box-shadow: none;
  border: 1px solid gray;
  height: 2.3rem;
  width: 30rem;
  font-size: 1.2rem;

  transition: all 0.2s;
}

input:focus{
  transform: scale(1.02);
}

h2{
    margin-right: 2rem;
    font-size: 2.3rem;
}

h1{
  font-size: 2rem;
}

.buttons{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;

  button{
    width:15rem;
    height: 3rem;
    font-weight: bold;
    font-size: 1.2rem;
    border: 1px solid black;
  }

  #loginButton{
    background-color: #89C055;
    margin-bottom: 2rem;
  }

  #registerButton{
    background-color: #1489AB;
  }
}


.loginForm{
  margin: 0 auto;
  margin-top: 5rem;
  width: 45rem;
}

.emailInput{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
}

.passwordInput{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}
</style>
