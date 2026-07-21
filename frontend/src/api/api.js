import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
  // withCredentials: true,
});

// ===============================
// REQUEST INTERCEPTOR
// ===============================
api.interceptors.request.use((config) => {
  try {
    // 1. LẤY VÀ GẮN TOKEN
    const authData = localStorage.getItem("auth");
    if (authData) {
      const auth = JSON.parse(authData);
      const token =
        auth?.accessToken?.accessToken || auth?.userInfo?.accessToken || auth?.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // 2. LẤY VÀ GẮN THÔNG TIN LANGUAGE
    // 💡 Lưu ý: Thay chữ "language" bằng đúng key mà bạn đang lưu trong localStorage.
    // Nếu bạn đang dùng thư viện i18next, key mặc định thường lưu là "i18nextLng"
    const language = localStorage.getItem("language") || localStorage.getItem("i18nextLng");

    if (language) {
      // Dùng chuẩn Accept-Language của HTTP
      config.headers["Accept-Language"] = language;

      // Hoặc nếu Backend của bạn yêu cầu một custom header rêng thì bật dòng dưới lên:
      // config.headers["X-Language"] = language;
    }

  } catch (error) {
    console.error("Lỗi cấu hình request interceptor:", error);
  }

  return config;
});
// ===============================
// RESPONSE INTERCEPTOR
// ===============================
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Nếu lỗi là 401 hoặc 403 (Token hết hạn hoặc không hợp lệ)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Kích hoạt sự kiện forceLogout để AuthContext xử lý
      window.dispatchEvent(new Event("forceLogout"));
    }
    return Promise.reject(error);
  }
);
export default api;