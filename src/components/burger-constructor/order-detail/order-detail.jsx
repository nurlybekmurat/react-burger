import { useSelector } from 'react-redux';
import { Spinner } from '../../spinner/spinner';
import styles from './order-detail.module.css';

export const OrderDetail = () => {
  const orderId = useSelector(state => state.orderDetail.orderID);
  const isLoading = useSelector(state => state.orderDetail.isLoading);
  const errMessage = useSelector(state => state.orderDetail.errorText);

  return(
    <>
      { orderId &&
      <div className={styles.OrderDetail}>
        <p className={`${styles.OrderTitle} text text_type_digits-large mb-8`}>{orderId}</p>
        <p className="text text_type_main-medium mb-15">
          идентификатор заказа
        </p>
        <img src="../done.png" alt="" className="mb-15" />
        <p className="text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
        </p>
      </div>
      }
      { isLoading &&
        <Spinner />
      }
      { errMessage &&
        <p className={`${styles.ErrorText} text text_type_main-default`}>{errMessage}</p>
      }
    </>
  )
}
