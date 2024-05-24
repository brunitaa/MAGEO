import axios from "./axios";

export const getProtocolsRequest = async () =>
  axios.get("/auth/users/protocols");

export const getMyProtocolsRequest = async () =>
  axios.get("/auth/users/protocols/me");

export const createProtocolRequest = async (protocol) =>
  axios.post("/auth/users/protocols", protocol);

export const updateProtocolRequest = async (id, protocol) =>
  axios.put(`/auth/users/protocols/${id}`, protocol);

export const acceptProtocolsRequest = async (id, protocol) =>
  axios.put(`/auth/admin/protocols/${id}/accept`, protocol);

export const rejectProtocolsRequest = async (id, protocol) =>
  axios.put(`/auth/admin/protocols/${id}/reject`, protocol);

export const deleteProtocolRequest = async (id) =>
  axios.delete(`/auth/users/protocols/${id}`);

export const getProtocolRequest = async (id) =>
  axios.get(`/auth/users/protocols/${id}`);
