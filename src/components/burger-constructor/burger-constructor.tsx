import { useState, useCallback, useEffect, FC } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientItem } from './ingredient-item/ingredient-item';
import { Modal } from '../modal/modal';
import { OrderDetail } from './order-detail/order-detail';
import { getCookie } from '../../utils/utils';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import { postOrder } from '../../utils/utils';
import { getUserInfo } from '../../services/user/actions';
import { getConstructorIngridients } from '../../services/constructor-ingredients/selectors';
import {
  getConstructorItem,
  deleteConstructorItem,
  getBunItem,
  moveConstructorItem
} from '../../services/constructor-ingredients/actions';
import { getOrderDetail, getOrderFailed, getOrderRequest } from '../../services/order-detail/actions';
import { useAppSelector, useAppDispatch  } from '../../hooks/index';
import { TElement, TElementState } from '../../utils/types'
import styles from './burger-constructor.module.css';

type TConstructorElementProps = {
  index?: number,
  element?: TElement,
  topOrBottom?: "top" | "bottom",
  extraName?: string
};

export const BurgerConstructor: FC<TConstructorElementProps> = () => {
  const isUserAuth = !!useAppSelector((state: any) => state.user.authChecked);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const data = useAppSelector(getConstructorIngridients);
  const dispatch = useAppDispatch();
  
  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(moveConstructorItem(dragIndex, hoverIndex))
  }, [dispatch])

  useEffect(() => {
    if (getCookie('token')) {
      dispatch(getUserInfo(getCookie('token')));
    }
  }, [])

  const [{ canDrop, isOver }, dropTarget] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item: TElement) => addConstructorElement(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let border = '';
  if (isActive) {
    border = '1px solid #198f51';
  } else if (canDrop) {
    border = '1px solid #4C4CFF';
  }

  const addConstructorElement = (element: TElement) => {
    element = { ...element, id: nanoid() }
    dispatch(getConstructorItem(element))
    dispatch(getBunItem(element))
  }
  const deleteElement = (element: TElementState) => {
    dispatch(deleteConstructorItem(element))
  }

  const handleOpen = () => {
    const orderIds = data.filter((item: TElementState) => {
      return item.data.type !== 'bun'
    });
    const bun = data.find((item: TElementState) => item.type === 'bun');
    orderIds.unshift(bun)
    orderIds.push(bun)
    const filteredOrderIds = orderIds.map((item: TElementState) => item.data._id);
    setIsOpen(true);
    dispatch(getOrderRequest());
    postOrder(filteredOrderIds, getCookie('token')!).then(data => {
      dispatch(getOrderDetail(data.order.number)) 
    }).catch((err) => dispatch(getOrderFailed(err.message)));
  }
  
  return (
    <div className={`${styles.BurgerConstructor}`}>
      <div className={`${styles.DropContainer} mb-10`} ref={dropTarget} style={{ border }}>
        <div className={`${styles.IngredientItem} mb-4`}>
          {data.length === 0 
          ? <div className='EmptyIngredient'>
              <ConstructorElement
                type="top"
                text='Выберите булки'
                extraClass={styles.EmptyIngredient}
                price={0}
                thumbnail={''}
              />
            </div>
          : data.map((element: TElementState, index: number) => {
            return element.type === 'bun' && (
              <ConstructorElement
                key={index}
                type="top"
                isLocked={true}
                text={`${element.data.name} (верх)`}
                price={element.data.price}
                thumbnail={element.data.image_mobile}
              />
            )
          })}
        </div>
        <ul className={`${styles.IngredientList} custom-scroll`}>
          { 
          data.length === 0
          ? 
          <li className={`${styles.IngredientItem}`}>
            <div className='EmptyIngredient'>
              <ConstructorElement
                extraClass={styles.EmptyIngredient}
                text='Выберите начинку'
                price={0}
                thumbnail={''}
              />
            </div>
          </li>
          : data.filter((item: TElementState) => item.type !== 'bun').map((item: TElementState, index: number) => (
              <IngredientItem 
                index={index}
                id={item.id}
                key={item.id} 
                data={item.data}
                moveElement={moveElement}
                deleteElement={() => deleteElement(item)}
              />
            ))
          }
        </ul>
        <div className={`${styles.IngredientItem} mt-4`}>
        {data.length === 0 
          ? <div className='EmptyIngredient'>
              <ConstructorElement
                type="bottom"
                text='Выберите булки'
                price={0}
                thumbnail={''}
              />
            </div>
          : data.map((element: TElementState, index: number) => {
            return element.type === 'bun' && (
              <ConstructorElement
                key={index}
                type="bottom"
                isLocked={true}
                text={`${element.data.name} (низ)`}
                price={element.data.price}
                thumbnail={element.data.image_mobile}
              />
            )
          })}
        </div>
      </div>
      <div className={`${styles.PriceWrapper} pr-2`}>
        <p className="text text_type_digits-medium mr-2">
          {data.reduce((accumulator: number, currentValue: TElementState) => {
            if (currentValue.data.type === 'bun') {
              return accumulator + (currentValue.data.price * 2)
            }
            return accumulator + currentValue.data.price
          },0)}
        </p>
        <span className="mr-10">
          <CurrencyIcon type="primary" />
        </span>
        <Button onClick={handleOpen} disabled={!isUserAuth} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
      { isOpen &&     
      <Modal handleClose={() => setIsOpen(false)}>
        <OrderDetail />
      </Modal>}
    </div>
  )
}
