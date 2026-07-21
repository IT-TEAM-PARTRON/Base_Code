import api from "../api.js";

// 1. Đăng nhập
export const loginUser = (credentials) => {
  return api.post("/auth/login", credentials);
};

// 2. Đăng xuất
// Thông thường backend cần token để biết ai đang logout hoặc để hủy session/token đó
export const logoutUser = () => {
  return api.post("/auth/logout");
};

// 3. Làm mới Token (Refresh Token)
// Khi Access Token hết hạn, app sẽ gửi Refresh Token lên để lấy cặp token mới
export const refreshToken = (token) => {
  return api.post("/auth/refresh-token", { refreshToken: token });
};