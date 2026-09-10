import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { syncTimeWithServer } from "./utils/dateTime.js";
import Login from "./pages/Login/Login.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import PrivateRoute from "./pages/Login/PrivateRoute.jsx";
import PermissionRoute from "./pages/Login/PermissionRoute.jsx";
import UserSpecs from "./pages/Admin/GeneralInfo/UserSpecs.jsx";
import Role from "./pages/Admin/GeneralInfo/Role.jsx";
import Mapping from "./pages/Admin/GeneralInfo/UserMapping.jsx";
import TranslationSpecs from "./pages/Admin/GeneralInfo/TranslationSpecs.jsx";
import FactorySpecs from "./pages/Admin/GeneralInfo/FactorySpecs.jsx";
import DepartmentSpecs from "./pages/Admin/GeneralInfo/DepartmentSpecs.jsx";
import Home from "./pages/Home/Home.jsx";
import AccessDenied from "./pages/Error/AccessDenied.jsx";

function App() {
  useEffect(() => {
    syncTimeWithServer();

    // Tùy chọn nâng cao: Đồng bộ lại mỗi khi User quay lại tab (focus)
    const handleFocus = () => syncTimeWithServer();
    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <Routes>
      {/* default → chuyển sang login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* login */}
      <Route path="/login" element={<Login />} />

      {/* Đường dẫn Routes có bảo vệ */}
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
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
  );
}

export default App;
