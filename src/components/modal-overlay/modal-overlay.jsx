import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ children, handleClose }) => {
  return(
    <div className={styles.Modal} onClick={handleClose}>
      {children}
    </div>
  )
}