import axios from "./axios";

export const getAPsRequest = async () =>
  axios.get("/auth/users/advertising-pieces");

export const getMyAPsRequest = async () =>
  axios.get("/auth/users/advertising-pieces");

export const createAPRequest = async (advertisement) => {
  try {
    axios.post("/auth/users/advertising-pieces", advertisiment);
    return res; // Retorna la respuesta del servidor si es necesario
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const updateAPRequest = async (id, advertisiment) =>
  axios.put(`/auth/users/advertising-pieces/${id}`, advertisiment);

export const deleteAPRequest = async (id) =>
  axios.delete(`/auth/users/advertising-pieces/${id}`);

export const getAPRequest = async (id) =>
  axios.get(`/auth/users/advertising-pieces/${id}`);

export const acceptAPRequest = async (id, event) =>
  axios.put(`/auth/admin/advertising-pieces/${id}/accept`, event);

export const rejectAPRequest = async (id, event) =>
  axios.put(`/auth/admin/advertising-pieces/${id}/reject`, event);
