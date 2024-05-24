import axios from "./axios";

export const getEventsRequest = async () => axios.get("/auth/users/events");

export const getMyEventsRequest = async () =>
  axios.get("/auth/users/events/me");

export const createEventRequest = async (event) =>
  axios.post("/auth/users/events", event);

export const updateEventsRequest = async (id, event) =>
  axios.put(`/auth/users/events/${id}`, event);

export const acceptEventsRequest = async (id, event) =>
  axios.put(`/auth/admin/events/${id}/accept`, event);

export const rejectEventsRequest = async (id, event) =>
  axios.put(`/auth/admin/events/${id}/reject`, event);

export const deleteEventsRequest = async (id) =>
  axios.delete(`/auth/users/events/${id}`);

export const getEventRequest = async (id) =>
  axios.get(`/auth/users/events/${id}`);
