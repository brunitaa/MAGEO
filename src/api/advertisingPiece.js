import axios from "./axios";

export const getAPsRequest = async () =>
  axios.get("/auth/users/advertising-pieces");

export const getMyAPsRequest = async () =>
  axios.get("/auth/users/advertising-pieces");

export const createAPRequest = async (data) => {
  try {
    const response = await axios.post("/auth/users/advertising-pieces", data);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error(
      "Error creating advertising piece:",
      error.response || error.message
    );
    throw new Error(error.response ? error.response.data : "Network Error");
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
