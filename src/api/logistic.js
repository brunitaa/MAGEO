import axios from "./axios";

export const getLogisticsRequest = async () =>
  axios.get("/auth/users/logistics");

export const getMyLogisticsRequest = async () =>
  axios.get("/auth/users/logistics");

export const createLogisticRequest = async (logistic) =>
  axios.post("/auth/users/logistics", logistic);

export const updateLogisticRequest = async (id, logistic) =>
  axios.put(`/auth/users/logistic/${id}`, logistic);

export const acceptLogisticsRequest = async (id, logistic) =>
  axios.put(`/auth/admin/logistic/${id}/accept`, logistic);

export const rejectLogisticsRequest = async (id, logistic) =>
  axios.put(`/auth/admin/logistic/${id}/reject`, logistic);

export const deleteLogisticRequest = async (id) =>
  axios.delete(`/auth/users/logistics/${id}`);

export const getLogisticRequest = async (id) =>
  axios.get(`/auth/users/logistics/${id}`);
