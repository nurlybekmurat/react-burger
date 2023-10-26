import { useState, useCallback } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientItem } from './ingredient-item/ingredient-item';
import { Modal } from '../modal/modal';
import { OrderDetail } from './order-detail/order-detail';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import { postOrder } from '../../utils/utils';
import { getLoginData } from '../../services/login/selectors';
import { getConstructorIngridients } from '../../services/constructor-ingredients/selectors';
import {
  getConstructorItem,
  deleteConstructorItem,
  getBunItem,
  moveConstructorItem
} from '../../services/constructor-ingredients/actions';
import { getOrderDetail, getOrderFailed, getOrderRequest } from '../../services/order-detail/actions';
import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data = useSelector(getConstructorIngridients);
  const isUserAuth = useSelector(getLoginData) ? false : true;
  const dispatch = useDispatch();
  const moveElement = useCallback((dragIndex, hoverIndex) => {
    dispatch(moveConstructorItem(dragIndex, hoverIndex))
  }, [dispatch])

  const [{ canDrop, isOver }, dropTarget] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) => addConstructorElement(item),
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

  const addConstructorElement = (element) => {
    element = { ...element, id: nanoid() }
    dispatch(getConstructorItem(element))
    dispatch(getBunItem(element))
  }
  const deleteElement = (element) => {
    dispatch(deleteConstructorItem(element))
  }

  const handleOpen = () => {
    const orderIds = data.map(item => item.data._id);
    setIsOpen(true);
    dispatch(getOrderRequest());
    postOrder(orderIds).then(data => {
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
                className={styles.EmptyIngredient}
                type="top"
                text='Выберите булки'
              />
            </div>
          : data.map((element, index) => {
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
                className={styles.EmptyIngredient}
                text='Выберите начинку'
              />
            </div>
          </li>
          : data.filter((item) => item.type !== 'bun').map((item, index) => (
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
              />
            </div>
          : data.map((element, index) => {
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
          {data.reduce((accumulator, currentValue) => {
            if (currentValue.data.type === 'bun') {
              return accumulator + (currentValue.data.price * 2)
            }
            return accumulator + currentValue.data.price
          },0)}
        </p>
        <span className="mr-10">
          <CurrencyIcon type="primary" />
        </span>
        <Button onClick={handleOpen} disabled={isUserAuth} htmlType="button" type="primary" size="medium">
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
