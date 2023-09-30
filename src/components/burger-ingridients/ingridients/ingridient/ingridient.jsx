import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../../../modal/modal';
import { IngridientDetail } from '../ingridient-detail/ingridient-detail';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingridient.module.css';

export const Ingridient = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <>
      <li className={`${styles.Card}`} key={data._id} onClick={()=> {setIsOpen(true)}}>
        <img className={`${styles.CardImage}`} src={data.image} alt="" />
        <span className={`${styles.CardCost} text text_type_main-default mb-1`}>
          <CurrencyIcon type="primary" />
          {data.price}
        </span>
        <h3 className={`${styles.CardTitle} text text_type_main-default`}>
          {data.name}
        </h3>
      </li>
      { isOpen &&
        <Modal handleClose={() => setIsOpen(false)} modalTitle={'Детали Ингридиента'}>
          <IngridientDetail data={data} />
        </Modal>
      }
    </>
  )
}

Ingridient.propTypes = {
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}