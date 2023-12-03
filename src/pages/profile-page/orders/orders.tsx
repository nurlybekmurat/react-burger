import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/index";
import { orderHistoryClose, orderHistoryStart } from "../../../services/order-history/actions";
import { getCookie } from "../../../utils/utils";
import { OrderCard } from "../../order-list/order-cards/order-card/order-card";
import styles from './orders.module.css'

export const Orders: FC = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { orderHistory } = useAppSelector(state => state.historySocket)

  React.useEffect(() => {
    dispatch(orderHistoryStart(`wss://norma.nomoreparties.space/orders?token=${getCookie('token')}`))
    return () => {
      dispatch(orderHistoryClose('closed by client'))
    }
  }, [])

  return (
    orderHistory ?
      <ul className={`${styles.List} custom-scroll`}>
        {orderHistory.orders.reverse().map(order => {
          return (
            <Link
              to={`/profile/orders/${order._id}`}
              state={{ backgroundLocation: location, orderNumber: order.number }}
              className={styles.Link}
              key={order._id}
            >
              <li className={styles.Item}>
                <OrderCard data={order} />
              </li>
            </Link>
          )
        })
        }
      </ul>
      :
      <></>
  )
}