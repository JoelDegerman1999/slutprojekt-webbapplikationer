import Api from "./Api";

export default {
  getAll() {
    return Api.get("products");
  },
  get(id) {
    return Api.get(`products/${id}`);
  },
  create(product) {
    let config = { header: { Authorization: "Bearer ****" } };
    return Api.post("products", product, config);
  },
  update(product) {
    let config = { header: { Authorization: "Bearer ****" } };
    return Api.patch(`products/${product.id}`, product, config);
  },
  delete(product) {
    let config = { header: { Authorization: "Bearer ****" } };
    return Api.delete(`products/${product.id}`, product, config);
  },
};
