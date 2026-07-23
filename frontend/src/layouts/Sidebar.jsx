import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft, FaTimes } from "react-icons/fa";
import { useAuth } from "../pages/Login/AuthContext.jsx";
import { useTranslation } from "react-i18next";

// 👇 IMPORT FILE CẤU HÌNH TRUNG TÂM
import { MENU_CONFIG } from "./menuConfig.js";

export default function Sidebar({ isCollapsed, onToggle, activeGroup }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const normalizePermission = (value = "") =>
    value.toString().trim().toUpperCase().replace(/[\s\-_]+/g, "");

  const permissions = (auth?.userInfo?.DESCRIPTION || "")
    .split(",")
    .map((p) => normalizePermission(p))
    .filter(Boolean);

  const hasPermission = (perm) => {
    if (!perm) return true;
    if (permissions.length === 0) return false;
    return permissions.includes(normalizePermission(perm));
  };

  const [openLevel3, setOpenLevel3] = useState("");

  useEffect(() => {
    if (activeGroup && activeGroup.items) {
      const activeSub = activeGroup.items.find((sub) =>
        sub.items && sub.items.some((level3) => location.pathname === level3.path)
      );
      if (activeSub) {
        setOpenLevel3(activeSub.key);
      }
    }
  }, [location.pathname, activeGroup]);
  const toggleLevel3 = (e, menu) => {
    e.preventDefault();
    setOpenLevel3(openLevel3 === menu ? "" : menu);
  };

  const isActive = (path) => location.pathname === path;
  const isParentActive = (path) => location.pathname.startsWith(path);

  const handleMenuClick = (e, path) => {
    e.preventDefault();
    if (location.pathname === path) navigate(0);
    else navigate(path);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {!isCollapsed && (
        <div className={styles.sidebarBackdrop} onClick={onToggle}></div>
      )}

      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>


      <div className={styles.menuDivider}></div>

      <nav className={styles.sidebarMenu}>
        {activeGroup && activeGroup.items && activeGroup.items.map((sub) => {
          const hasLevel3 = sub.items && sub.items.length > 0;
          
          let hasAccess = false;
          if (hasLevel3) {
            hasAccess = sub.items.some(item => hasPermission(item.key));
          } else {
            hasAccess = hasPermission(sub.key);
          }
          
          if (!hasAccess) return null;
          
          if (!hasLevel3) {
            return (
              <div key={sub.key} className={styles.menuSection}>
                <Link
                  to={sub.path}
                  className={`${styles.menuTitle} ${isActive(sub.path) ? styles.activeParent : ""}`}
                  onClick={(e) => handleMenuClick(e, sub.path)}
                >
                  <div className={styles.titleContent}>
                    <span className={styles.subDot}></span>
                    <span>{t(sub.titleKey)}</span>
                  </div>
                </Link>
              </div>
            );
          }

          // Render expandable menu (previously level 3, now essentially level 2 in sidebar)
          const isLevel3Open = openLevel3 === sub.key;
          return (
            <div key={sub.key} className={styles.menuSection}>
              <div
                className={`${styles.menuTitle} ${isParentActive(sub.path || "invalid_path") ? styles.activeParent : ""}`}
                onClick={(e) => toggleLevel3(e, sub.key)}
              >
                <div className={styles.titleContent}>
                  <span className={styles.subDot}></span>
                  <span>{t(sub.titleKey)}</span>
                </div>
                <FaChevronRight className={`${styles.arrow} ${isLevel3Open ? styles.open : ""}`} />
              </div>
              
              <div className={`${styles.submenuContainer} ${isLevel3Open ? styles.open : ""}`}>
                {sub.items.map((level3) => {
                  if (!hasPermission(level3.key)) return null;
                  return (
                    <Link
                      key={level3.key}
                      to={level3.path}
                      className={`${styles.submenuItem} ${isActive(level3.path) ? styles.active : ""}`}
                      onClick={(e) => handleMenuClick(e, level3.path, true)}
                    >
                      <span className={styles.level3Dot}>-</span>
                      {t(level3.titleKey)}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
    </>
  );
}