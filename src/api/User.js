import Api from "./Api";

export default {
  auth(email, password) {
 
    return Api.post("auth", {
      email: email,
      password: password,
    });
    
  },
  register(user) {
    return Api.post("register", user);
  },
};
