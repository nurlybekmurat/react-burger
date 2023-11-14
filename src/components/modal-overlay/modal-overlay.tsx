import { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IProps {
  handleClose: ()=> void;
}

export const ModalOverlay:FC <IProps> = ({ handleClose }) => {
  return(
    <div className={styles.ModalOverlay} onClick={handleClose}>
      
    </div>
  )
}