import Api from "./Api";

export default {
  getAll() {
    return Api.get("products");
  },
  get(id) {
    return Api.get(`products/${id}`);
  },
  create(product) {
    let config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlpMVVNCUjFXSmNsVGdpdUUiLCJleHAiOjE1OTEyNzMwMzEsImlhdCI6MTU5MTI2OTQzMX0.YMe4t4P6yk2ipr558rYNvE-uGAMVfRgvDuebzrEgRtw",
      },
    };
    return Api.post("products", product, config);
  },
  update(product) {
    let config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlpMVVNCUjFXSmNsVGdpdUUiLCJleHAiOjE1OTEyNzMwMzEsImlhdCI6MTU5MTI2OTQzMX0.YMe4t4P6yk2ipr558rYNvE-uGAMVfRgvDuebzrEgRtw",
        "Content-Type": "application/json",
      },
    };
    return Api.patch(`products/${product._id}`, product, config);
  },
  delete(product) {
    let config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlpMVVNCUjFXSmNsVGdpdUUiLCJleHAiOjE1OTEyNzMwMzEsImlhdCI6MTU5MTI2OTQzMX0.YMe4t4P6yk2ipr558rYNvE-uGAMVfRgvDuebzrEgRtw",
        "Content-Type": "application/json",
      },
    };
    return Api.delete(`products/${product._id}`, config);
  },
};
