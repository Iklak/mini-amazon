import api from "./api";

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const { data } = await api.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const addProduct = async (formData) => {
  const token = localStorage.getItem("token");

  const { data } = await api.post("/admin/products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/admin/products/${id}`);
  return res.data;
};
