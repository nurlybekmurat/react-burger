import { useState } from 'react';
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
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen} modalTitle={'Детали Ингридиента'}>
        <IngridientDetail data={data} />
      </Modal>
    </>
  )
}