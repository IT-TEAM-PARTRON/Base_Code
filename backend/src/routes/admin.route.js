import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  changeUserPassword,
} from "../controllers/admin/userSpec.controller.js";
import { getAllRoles, createRole, updateRole, deleteRole } from "../controllers/admin/role.controller.js";
import { updateRolePermission } from "../controllers/admin/mapping.controller.js";
import {
  getAllTranslations,
  updateTranslation,
  importTranslations,
} from "../controllers/admin/translation.controller.js";
import {
  getAllFactories,
  createFactory,
  updateFactory,
  deleteFactory,
} from "../controllers/admin/factory.controller.js";
import {
  getAllDepartments,
  getDepartmentsByFactory,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/admin/department.controller.js";
// DataSpec controller đã được xóa (không còn nghiệp vụ nguyên vật liệu)

const router = express.Router();

//================ User =====================
router.get("/admin/users", authMiddleware, getAllUsers);
router.post("/admin/users", authMiddleware, createUser);
router.put("/admin/users/:userId", authMiddleware, updateUser);
router.delete("/admin/users/:userId", authMiddleware, deleteUser);
router.post("/admin/users/:userId/change-password", authMiddleware, changeUserPassword);

//================ Role =====================
router.get("/admin/roles", authMiddleware, getAllRoles);
router.post("/admin/roles", authMiddleware, createRole);
router.put("/admin/roles/:id", authMiddleware, updateRole);
router.delete("/admin/roles/:id", authMiddleware, deleteRole);

//================ Mapping =====================
router.put("/admin/mapping/:id", authMiddleware, updateRolePermission);

//================ Translation =====================
router.get("/admin/translations", authMiddleware, getAllTranslations);
router.put("/admin/translations/:id", authMiddleware, updateTranslation);
router.post("/admin/translations/import", authMiddleware, importTranslations);

//================ Factory =====================
router.get("/admin/factories", authMiddleware, getAllFactories);
router.post("/admin/factories", authMiddleware, createFactory);
router.put("/admin/factories/:id", authMiddleware, updateFactory);
router.delete("/admin/factories/:id", authMiddleware, deleteFactory);

//================ Department =====================
router.get("/admin/departments",  getAllDepartments);
router.get("/admin/departments/factory/:factoryId", authMiddleware, getDepartmentsByFactory);
router.post("/admin/departments", authMiddleware, createDepartment);
router.put("/admin/departments/:id", authMiddleware, updateDepartment);
router.delete("/admin/departments/:id", authMiddleware, deleteDepartment);


// Data Spec routes đã được xóa

export default router;
