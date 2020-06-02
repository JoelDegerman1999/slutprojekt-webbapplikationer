import Api from "./Api";

export default {
  get() {
    let config = { header: { Authorization: "Bearer ****" } };
    return Api.get("orders", config);
  },
  create(order) {
    let config = { header: { Authorization: "Bearer ****" } };
    return Api.post("orders", order, config);
  },
};
