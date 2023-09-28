import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

export const Modal = ({ children, isOpen, handleClose, modalTitle='' }) => {
  useEffect(() => {
    const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay handleClose={handleClose}>
      <div className={styles.Modal}>
        <button onClick={handleClose} className={styles.ModalCloseBtn}>
          <CloseIcon type="primary" />
        </button>
        <h2 className={`${styles.ModalTitle} text text_type_main-large mb-4`}>
          {modalTitle}
        </h2>
        <div className="modal-content">{children}</div>
      </div>
    </ModalOverlay>,
    document.getElementById('react-portal-modal-container')
  );
}