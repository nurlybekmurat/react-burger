import { FC } from 'react';
import { TOrderFeedOptions } from '../../../../../utils/types';
import styles from './orders-number.module.css';

type IOrdersNumber = {
  title: string,
  data?: TOrderFeedOptions[],
  style: string,
  type: string,
}

export const OrdersNumber: FC<IOrdersNumber> = ({ title, data, type, style }) => {
  return (
    <div>
      <p className="text text_type_main-medium mb-6">
        {title}
      </p>
      <ul className={styles.List} style={{ color: style}}>
        {
          data && 
          data.map((order, index) => {
            if (order.status === type && index < 20 ){
              return <li className={`${styles.Item} text text_type_digits-default`} key={index}>{order.number}</li>
            }
          })
        }
      </ul>
    </div>
  )
}