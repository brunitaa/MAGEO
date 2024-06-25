import axios from "./axios";

export const getUserInformationByIdRequest = async (id) =>
  axios.get(`/auth/users/${id}`);

export const getMyUserInformationRequest = async () =>
  axios.get(`/auth/users/me`);

export const updateMyUserInformationRequest = async (user) =>
  axios.put(`/auth/users/me`, user);
