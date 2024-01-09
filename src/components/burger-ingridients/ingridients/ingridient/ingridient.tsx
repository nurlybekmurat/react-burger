import {  useMemo, FC } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { getIngredientDetail } from '../../../../services/ingredient-detail/actions';
import { useAppSelector, useAppDispatch  } from '../../../../hooks/index';
import styles from './ingridient.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TElement, TElementState } from '../../../../utils/types';

interface IProps {
  data: TElement
}

export const Ingridient: FC <IProps>= ({data}) => {
  const dispatch = useAppDispatch();
  const constructorList = useAppSelector((state: any) => state.ingredientsConstructor.constructorList);
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
    dispatch(getIngredientDetail(data))
  }

  return(
    <>
      <Link to={`ingredients/${data._id}`} state={{ backgroundLocation: location }} className={styles.CardLink}>
        <li className={`${styles.Card}`} onClick={handleOpen} 
          data-test={data.name}
          >
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
    </>
  )
}

