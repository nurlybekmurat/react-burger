import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ handleClose }) => {
  return(
    <div className={styles.ModalOverlay} onClick={handleClose}>
      
    </div>
  )
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired
};