import { useState, useMemo, FC } from 'react';
import { Modal } from '../../../modal/modal';
import { IngridientDetail } from '../ingridient-detail/ingridient-detail';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { getIngredientDetail, clearIngredientDetail } from '../../../../services/ingredient-detail/actions';
import { useAppSelector, useAppDispatch  } from '../../../../hooks/index';
import styles from './ingridient.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TElement, TElementState } from '../../../../utils/types';

interface IProps {
  data: TElement
}

export const Ingridient: FC <IProps>= ({data}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const constructorList = useAppSelector((state: any) => state.ingredientsConstructor.constructorList);
  const ingredientDetail = useAppSelector(state => state.ingredientDetail.ingredientDetail);
  const location = useLocation();

  const countValue = useMemo(() => {
    let count = 0;
    constructorList.forEach((item: TElementState) => {
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
      <Link to={`ingredients/${data._id}`} state={{ backgroundLocation: location }} className={styles.CardLink}>
        <li className={`${styles.Card}`} onClick={handleOpen} >
          {countValue > 0 &&
            <div className={styles.Counter}>
              <Counter 
                count={countValue} 
                size="default" 
                />
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
      </Link>
      { isOpen && 
        <Modal handleClose={handleClose} modalTitle={'Детали Ингридиента'}>
          <IngridientDetail data={ingredientDetail} />
        </Modal>
      }
    </>
  )
}

