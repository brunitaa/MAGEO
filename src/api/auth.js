import axios from "./axios";

export const loginRequest = async (user) => axios.post(`/login`, user);
export const logoutRequest = async (user) => axios.post(`/logout`);

export const verifyTokenRequest = async () => axios.get(`/auth/status`);
