import PropTypes from 'prop-types';
import styles from './order-detail.module.css';

export const OrderDetail = ({orderId}) => {
  return(
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
  )
}

OrderDetail.propTypes = {
  orderId: PropTypes.string
}; 