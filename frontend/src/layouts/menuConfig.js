import { IoSettingsOutline, IoDocumentTextOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";

/**
 * Cấu hình Menu tập trung cho hệ thống Approval Management
 * - key: Quyền tương ứng trong Database (Permissions)
 * - titleKey: Key i18n để dịch đa ngôn ngữ
 * - icon: Component Icon (chỉ dùng cho Menu cha hoặc Menu đơn)
 * - path: Đường dẫn Route
 * - items: Danh sách menu con (nếu có)
 * Lưu ý: menu cha sẽ có key kết thúc bằng "_GRP" để dễ dàng phân biệt và xử lý trong Sidebar.jsx
 */
export const MENU_CONFIG = [
  {
    key: "ADMIN_GRP",
    titleKey: "sidebar.admin",
    icon: IoSettingsOutline,
    path: "/admin",
    items: [
      {
        key: "ADMIN_GENERAL_INFO",
        titleKey: "sidebar.general_info",
        items: [
          {
            key: "ADMIN_FACTORY",
            titleKey: "sidebar.admin_factory",
            path: "/admin/factories",
          },
          {
            key: "ADMIN_DEPARTMENT",
            titleKey: "sidebar.admin_department",
            path: "/admin/departments",
          },
          {
            key: "ADMIN_ROLE",
            titleKey: "sidebar.admin_roles",
            path: "/admin/roles",
          },
          {
            key: "ADMIN_USER",
            titleKey: "sidebar.admin_users",
            path: "/admin/users",
          },
          {
            key: "ADMIN_MAPPING",
            titleKey: "sidebar.admin_mapping",
            path: "/admin/mapping",
          },
          {
            key: "ADMIN_TRANSLATION",
            titleKey: "sidebar.admin_translation",
            path: "/admin/translations",
          },
        ]
      }
    ],
  },
];