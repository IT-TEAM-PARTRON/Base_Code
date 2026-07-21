import api from "../api.js";

export const refreshToken = (refreshToken) => {
  return api.post("/auth/refresh", { refreshToken });
};