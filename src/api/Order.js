import Api from "./Api";

export default {
  get() {
    let config = { header: { Authorization: `Bearer ${token}` } };
    return Api.get("orders", config);
  },
  create(order, token) {
    let config = { header: { Authorization: `Bearer ${token}` } };
    return Api.post("orders", order, config);
  },
};
