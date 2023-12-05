import { FC } from 'react';
import styles from './order-cards.module.css';
import { OrderCard } from './order-card/order-card';
import { useAppSelector } from '../../../hooks';
import { Link, useLocation } from 'react-router-dom';

export const OrderCards: FC = () => {
  const { orderFeed } = useAppSelector(state => state.feedSocket);
  const location = useLocation();

  return (
    <div className={`${styles.OrderCards} custom-scroll`}>
      { orderFeed?.orders.map((item, index) => { 
          return (
            <Link
              key={item._id}
              to={`/feed/${item._id}`}
              state={{ backgroundLocation: location, orderNumber: item.number }}
              className={styles.Link}
            >
            <OrderCard data={item} key={index} />
            </Link>
          )
        })
      }
    </div>
  )
}