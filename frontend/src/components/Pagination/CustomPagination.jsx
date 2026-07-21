import React from 'react';
import styles from './CustomPagination.module.css';
import { useTranslation } from "react-i18next";
import { TbChevronLeft, TbChevronRight, TbChevronsLeft, TbChevronsRight } from "react-icons/tb";

const CustomPagination = ({ page, pageSize, total, onPageChange, onPageSizeChange }) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(total / pageSize) || 1;

  const handleFirst = () => onPageChange(1);
  const handlePrev = () => onPageChange(Math.max(1, page - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, page + 1));
  const handleLast = () => onPageChange(totalPages);

  const handleSizeChange = (e) => {
    onPageSizeChange(Number(e.target.value));
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.leftSection}>
        <span>{t("pagination.rows_per_page") || "Rows per page"}:</span>
        <select value={pageSize} onChange={handleSizeChange} className={styles.pageSizeSelect}>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={500}>500</option>
        </select>
      </div>

      <div className={styles.centerSection}>
        <button onClick={handleFirst} disabled={page === 1} className={styles.pageBtn} title="First Page">
          <TbChevronsLeft size={16} />
        </button>
        <button onClick={handlePrev} disabled={page === 1} className={styles.pageBtn} title="Previous Page">
          <TbChevronLeft size={16} />
        </button>
        
        <span className={styles.pageInfo}>
          {t("pagination.page") || "Page"} <strong>{page}</strong> {t("pagination.of") || "of"} <strong>{totalPages}</strong>
        </span>
        
        <button onClick={handleNext} disabled={page === totalPages} className={styles.pageBtn} title="Next Page">
          <TbChevronRight size={16} />
        </button>
        <button onClick={handleLast} disabled={page === totalPages} className={styles.pageBtn} title="Last Page">
          <TbChevronsRight size={16} />
        </button>
      </div>

      <div className={styles.rightSection}>
      </div>
    </div>
  );
};

export default CustomPagination;
