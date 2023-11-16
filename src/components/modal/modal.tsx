import { FC, ReactNode , useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

interface IProps {
  children?: ReactNode;
  handleClose: () => void;
  modalTitle?: string;
}

export const Modal: FC<IProps> = ({ children, handleClose, modalTitle='' }) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return createPortal(
    <>
      <ModalOverlay handleClose={handleClose} />
      <div className={styles.Modal}>
        <button onClick={handleClose} className={styles.ModalCloseBtn}>
          <CloseIcon type="primary" />
        </button>
        <h2 className={`${styles.ModalTitle} text text_type_main-large mb-4`}>
          {modalTitle}
        </h2>
        <div className="modal-content">{children}</div>
      </div>
    </>,
    document.getElementById('react-portal-modal-container')!
  );
}