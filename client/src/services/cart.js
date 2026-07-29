import api from "./api";
export const addToCart = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await api.post(
    "/cart",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const getCart = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateCart = async (productId, quantity) => {
  const token = localStorage.getItem("token");
  const res = await api.put(
    `/cart/${productId}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const removeCartItem = async (productId) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(`/cart/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
