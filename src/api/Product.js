import Api from "./Api";

export default {
  getAll() {
    return Api.get("products");
  },
  get(id) {
    return Api.get(`products/${id}`);
  },
  create(product, token) {
    let config = { header: { Authorization: `Bearer ${token}` } };
    return Api.post("products", product, config);
  },
  update(product, token) {
    let config = { header: { Authorization: `Bearer ${token}` } };
    return Api.patch(`products/${product._id}`, product, config);
  },
  delete(product, token) {
    let config = { header: { Authorization: `Bearer ${token}` } };
    return Api.delete(`products/${product._id}`, config);
  },
};
