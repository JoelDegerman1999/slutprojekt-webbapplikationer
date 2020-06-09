import Api from "./Api";

export default {
  get() {
    let config = { headers: { Authorization: `Bearer ${token}` } };
    return Api.get("orders", config);
  },
  create(order, token) {
    let config = { headers: { Authorization: `Bearer ${token}` } };
    return Api.post("orders", order, config);
  },
};
