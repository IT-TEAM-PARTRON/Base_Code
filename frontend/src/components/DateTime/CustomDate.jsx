import { forwardRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css"; // Theme sáng mặc định
import { TbCalendar } from "react-icons/tb";
import styles from "./CustomDate.module.css";

const CustomDate = forwardRef(
  (
    {
      label,
      required = false,
      value,
      onChange,
      disabled = false,
      width = "100%", // Tự fill theo Grid
      labelWidth = "160px", // Khớp với form chuẩn
      options = {}, // Ghi đè hoặc thêm tùy chọn cho Flatpickr (VD: mode: "range")
      ...rest
    },
    ref
  ) => {

    // Cấu hình mặc định cho Flatpickr
    const defaultOptions = {
      dateFormat: "Y-m-d", // Chuẩn định dạng Backend thường dùng
      allowInput: true,    // Cho phép gõ tay
      locale: {
        rangeSeparator: " ~ " // Đổi chữ "to" thành "~" nếu dùng mode range
      },
      ...options, // Trộn các tùy chọn được truyền từ component cha vào
    };

    return (
      <div
        className={styles.wrapper}
        style={{
          gridTemplateColumns: label ? `${labelWidth} 1fr` : "1fr",
          width,
        }}
      >
        {/* ── Label ── */}
        {label && (
          <div className={styles.labelWrap}>
            {required && <span className={styles.required}>*</span>}
            <span className={styles.labelText}>{label}</span>
          </div>
        )}

        {/* ── Flatpickr Container ── */}
        <div className={styles.inputContainer}>
          <Flatpickr
            ref={ref}
            className={`${styles.flatpickrInput} ${disabled ? styles.inputDisabled : ""}`}
            value={value}
            // Flatpickr trả về (selectedDates, dateStr, instance)
            onChange={(selectedDates, dateStr, instance) => {
              if (onChange) onChange(selectedDates, dateStr, instance);
            }}
            disabled={disabled}
            options={defaultOptions}
            {...rest}
          />

          {/* Icon cuốn lịch nằm đè lên input */}
          <TbCalendar className={styles.calendarIcon} size={18} />
        </div>
      </div>
    );
  }
);

CustomDate.displayName = "CustomDate";

export default CustomDate;