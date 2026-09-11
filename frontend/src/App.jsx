import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { syncTimeWithServer } from "./utils/dateTime.js";
import PrivateRoute from "./pages/Login/PrivateRoute.jsx";
import PermissionRoute from "./pages/Login/PermissionRoute.jsx";
import CustomLoading from "./components/Loading/CustomLoading.jsx";

const Login = lazy(() => import("./pages/Login/Login.jsx"));
const MainLayout = lazy(() => import("./layouts/MainLayout.jsx"));
const UserSpecs = lazy(() => import("./pages/Admin/GeneralInfo/UserSpecs.jsx"));
const Role = lazy(() => import("./pages/Admin/GeneralInfo/Role.jsx"));
const Mapping = lazy(() => import("./pages/Admin/GeneralInfo/UserMapping.jsx"));
const TranslationSpecs = lazy(
  () => import("./pages/Admin/GeneralInfo/TranslationSpecs.jsx"),
);
const FactorySpecs = lazy(
  () => import("./pages/Admin/GeneralInfo/FactorySpecs.jsx"),
);
const DepartmentSpecs = lazy(
  () => import("./pages/Admin/GeneralInfo/DepartmentSpecs.jsx"),
);
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const AccessDenied = lazy(() => import("./pages/Error/AccessDenied.jsx"));

function App() {
  useEffect(() => {
    syncTimeWithServer();

    // Tùy chọn nâng cao: Đồng bộ lại mỗi khi User quay lại tab (focus)
    const handleFocus = () => syncTimeWithServer();
    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <Suspense fallback={<CustomLoading show />}>
      <Routes>
        {/* default → chuyển sang login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* login */}
        <Route path="/login" element={<Login />} />

        {/* Đường dẫn Routes có bảo vệ */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* Trang chủ Dashboard */}
          <Route path="/home" element={<Home />} />
          <Route path="/403" element={<AccessDenied />} />

          {/* Admin - Quản lý người dùng, quyền hạn */}
          <Route
            path="/admin/users"
            element={
              <PermissionRoute permission="ADMIN_USER">
                <UserSpecs />
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/roles"
            element={
              <PermissionRoute permission="ADMIN_ROLE">
                <Role />
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/mapping"
            element={
              <PermissionRoute permission="ADMIN_MAPPING">
                <Mapping />
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/translations"
            element={
              <PermissionRoute permission="ADMIN_TRANSLATION">
                <TranslationSpecs />
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/factories"
            element={
              <PermissionRoute permission="ADMIN_FACTORY">
                <FactorySpecs />
              </PermissionRoute>
            }
          />
          <Route
            path="/admin/departments"
            element={
              <PermissionRoute permission="ADMIN_DEPARTMENT">
                <DepartmentSpecs />
              </PermissionRoute>
            }
          />

          {/* TODO: Thêm các routes cho Approval Management sau */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
