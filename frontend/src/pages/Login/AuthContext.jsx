import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : null;
  });

  const timerRef = useRef(null);
  const idleTimer = useRef(null);
  const IDLE_TIMEOUT = 60 * 60 * 1000; // 60 phút

  // --- TỐI ƯU 1: Gom chung logic Logout (Dùng useCallback để không bị tạo lại) ---
  const logout = useCallback(() => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  }, [navigate]);

  // Hàm login
  const login = (data) => setAuth(data);

  // Hàm reset timer
  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      logout();
    }, IDLE_TIMEOUT);
  }, [logout, IDLE_TIMEOUT]);

  // --- TỐI ƯU 2: Thêm Throttling cho sự kiện di chuột ---
  useEffect(() => {
    // Chỉ theo dõi idle nếu user ĐÃ đăng nhập
    if (!auth) return;

    let throttleTimer = false;
    const THROTTLE_INTERVAL = 60 * 1000; // 1 phút (60.000ms)

    const handleUserActivity = () => {
      // Kỹ thuật Throttle: Chỉ gọi resetTimer nếu throttleTimer đang là false
      if (!throttleTimer) {
        resetIdleTimer();
        throttleTimer = true;

        // Khóa lại trong 1 phút . Trong 1 phút này mọi di chuột khác đều bị phớt lờ
        setTimeout(() => {
          throttleTimer = false;
        }, THROTTLE_INTERVAL);
      }
    };

    const events = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, handleUserActivity));

    resetIdleTimer(); // Khởi động timer lần đầu

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleUserActivity));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [auth, resetIdleTimer]); // Đã thêm đủ dependencies chuẩn mực

  // --- 1. Lưu auth vào localStorage ---
  useEffect(() => {
    if (auth) localStorage.setItem("auth", JSON.stringify(auth));
    else localStorage.removeItem("auth");
  }, [auth]);

  // --- 2. Kiểm tra token expired (Sử dụng lại hàm logout) ---
  useEffect(() => {
    const expiresAt = auth?.userInfo?.expires_at || auth?.token?.expires_at;
    if (expiresAt) {
      const expireTime = new Date(expiresAt).getTime();
      const now = Date.now();

      if (now > expireTime) {
        timerRef.current = setTimeout(logout, 0);
        return () => clearTimeout(timerRef.current);
      }

      // Hẹn giờ auto logout khi đến hạn
      const remaining = expireTime - now;
      timerRef.current = setTimeout(() => {
        logout();
      }, remaining);

      return () => clearTimeout(timerRef.current);
    }
  }, [auth, location.pathname, logout]);

  // --- 3. Đồng bộ auth giữa các tab ---
  useEffect(() => {
    const syncHandler = (e) => {
      if (e.key === "auth") setAuth(e.newValue ? JSON.parse(e.newValue) : null);
    };
    window.addEventListener("storage", syncHandler);
    return () => window.removeEventListener("storage", syncHandler);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
