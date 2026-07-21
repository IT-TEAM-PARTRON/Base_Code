import styles from "./CustomConfirmModal.module.css";
import CustomButton from "../Button/CustomButton.jsx";
import { TbAlertTriangle, TbX, TbCheck } from "react-icons/tb";

export default function CustomConfirmModal({
  isOpen,
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  onConfirm,
  onCancel,
  confirmText = "Xóa",
  cancelText = "Hủy",
  isDanger = true, // Mặc định là nút đỏ (Xóa), nếu false sẽ là nút xanh (Đồng ý)
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <TbAlertTriangle
              size={24}
              className={isDanger ? styles.iconDanger : styles.iconWarning}
            />
            <h3>{title}</h3>
          </div>
          <button className={styles.closeBtn} onClick={onCancel}>
            <TbX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <p>{message}</p>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <CustomButton type="default" onClick={onCancel} style={{ textTransform: "none" }}>
            {cancelText}
          </CustomButton>
          <CustomButton
            type={isDanger ? "danger" : "primary"}
            icon={isDanger ? <TbAlertTriangle size={18} /> : <TbCheck size={18} />}
            onClick={onConfirm}
            style={{ textTransform: "none" }}
          >
            {confirmText}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}