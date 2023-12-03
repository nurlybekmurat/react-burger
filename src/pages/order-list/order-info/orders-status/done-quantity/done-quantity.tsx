import { FC } from 'react';
import styles from './done-quantity.module.css';

type IDoneQuantity = {
  title?: string,
  quantity?: number,
}

export const DoneQuantity: FC<IDoneQuantity> = ({title, quantity}) => {
  return (
    <div className={styles.Wrapper}>
      <p className="text text_type_main-medium">
        {title}
      </p>
      <p className={`${styles.Number} text text_type_digits-large`}>
        {quantity}
      </p>
    </div>
  )
}