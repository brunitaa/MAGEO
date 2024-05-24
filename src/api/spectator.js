import axios from "./axios";

export const getSpectatorsRequest = async () => axios.get("/auth/spectators");

export const getMySpectatorAdminRequest = async () =>
  axios.get("/auth/admin/spectators/me");

export const createSpectatorRequest = async (spectator) =>
  axios.post("/auth/admin/spectators", spectator);

export const updateSpectatorRequest = async (id, spectator) =>
  axios.put(`/auth/admin/spectators/${id}`, spectator);

export const deleteSpectatorRequest = async (id) =>
  axios.delete(`/auth/admin/spectators/${id}`);

export const getSpectatorRequest = async (id) =>
  axios.get(`/auth/spectators/${id}`);
