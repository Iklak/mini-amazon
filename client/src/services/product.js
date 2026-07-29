import api from "./api";
export const getProduct = async (search = "", page = 1) => {
  const response = await api.get("/products", {
    params: {
      search,
      page,
      limit: 5,
    },
  });
  return response.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/admin/products/${id}`);
  return res.data;
};
