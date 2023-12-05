import { FC, useEffect } from 'react';
import styles from './order-list.module.css';
import { OrderCards } from './order-cards/order-cards';
import { OrderInfo } from './order-info/order-info';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { orderFeedClose, orderFeedStart } from '../../services/order-feed/actions';

export const OrderList: FC = () => {
  const dispatch = useAppDispatch()
  const { orderFeed } = useAppSelector(state => state.feedSocket)

  useEffect(() => {
      dispatch(orderFeedStart('wss://norma.nomoreparties.space/orders/all'))
      return () => {
          dispatch(orderFeedClose('closed by client'))
      }
  }, [])

  return (
    <div>
      <h1 className="text text_type_main-large mb-5">
        Лента заказов
      </h1>
      { orderFeed ?
        (<div className={styles.OrderListWrapper}>
          <OrderCards />
          <OrderInfo />
        </div>) 
        : 
        <></>
      }
    </div>
  )
}