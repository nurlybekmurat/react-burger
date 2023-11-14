import { FC } from 'react';
import styles from './not-found-page.module.css';

export const NotFoundPage: FC = () => {
  return (
    <div className={styles.Wrapper}>
      <p className="text text_type_digits-large mt-20">404</p>
      <p className="text text_type_main-large">
        Страница не найдена
      </p>
    </div>
  )
}