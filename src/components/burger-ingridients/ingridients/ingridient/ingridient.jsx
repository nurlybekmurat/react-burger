import { useState, useMemo } from 'react';
import { ingredientType } from '../../../../utils/prop-types';
import { Modal } from '../../../modal/modal';
import { IngridientDetail } from '../ingridient-detail/ingridient-detail';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientDetail, clearIngredientDetail } from '../../../../services/ingredient-detail/actions';
import styles from './ingridient.module.css';

export const Ingridient = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const constructorList = useSelector(state => state.ingredientsConstructor.constructorList);
  const countValue = useMemo(() => {
    let count = 0;
    constructorList.forEach(item => {
      if (item.data._id === data._id) {
        count++;
      }
      if (item.data._id === data._id && item.type === 'bun') {
        count = 2;
      }
    });
    return count;
  }, [constructorList, data]);

  const [didDrop, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: {
      id: data._id,
      data: data,
      type: data.type,
    },
    collect: monitor => ({
      didDrop: !!monitor.didDrop()
    })
  }), []);

  const handleOpen = () => {
    setIsOpen(true);
    dispatch(getIngredientDetail(data))
  }

  const handleClose = () => {
    setIsOpen(false);
    dispatch(clearIngredientDetail())
  }

  return(
    <>
      <li className={`${styles.Card}`} onClick={handleOpen} >
        {countValue > 0 &&
          <div className={styles.Counter}>
            <Counter id={data._id} count={countValue} size="default" />
          </div>
        }
        <img 
          className={`${styles.CardImage}`} 
          src={data.image} alt="" 
          ref={dragRef} 
          style={{ cursor: didDrop ? 'grab' : 'default' }}
        />
        <span className={`${styles.CardCost} text text_type_main-default mb-1`}>
          <CurrencyIcon type="primary" />
          {data.price}
        </span>
        <h3 className={`${styles.CardTitle} text text_type_main-default`}>
          {data.name}
        </h3>
      </li>
      { isOpen &&
        <Modal handleClose={handleClose} modalTitle={'Детали Ингридиента'}>
          <IngridientDetail data={data} />
        </Modal>
      }
    </>
  )
}
Ingridient.propTypes = {
  data: ingredientType.isRequired
}
