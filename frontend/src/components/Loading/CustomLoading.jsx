import React from 'react';
import styles from './CustomLoading.module.css';

const CustomLoading = ({
  show = false,
  message = "Processing...",
  percentage = 0 // Giá trị từ 0 đến 100
}) => {
  if (!show) return null;

  // Tính toán vòng tròn SVG
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.progressBox}>
          <svg className={styles.svg} width="120" height="120">
            {/* Vòng tròn nền xám */}
            <circle
              className={styles.circleBg}
              cx="60" cy="60" r={radius}
              strokeWidth="10"
            />
            {/* Vòng tròn tiến trình màu xanh */}
            <circle
              className={styles.circleProgress}
              cx="60" cy="60" r={radius}
              strokeWidth="10"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset
              }}
            />
          </svg>
          <div className={styles.percentageText}>{Math.round(percentage)}%</div>
        </div>
        {message && <p className={styles.text}>{message}</p>}
      </div>
    </div>
  );
};

export default CustomLoading;