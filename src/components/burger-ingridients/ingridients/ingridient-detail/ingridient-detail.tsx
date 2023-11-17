import { FC } from 'react';
import { TElement } from '../../../../utils/types';
import styles from './ingridient-detail.module.css';
import { useAppSelector } from '../../../../hooks';
import { useParams } from 'react-router-dom';


export const IngridientDetail: FC = () => {
  const { id } = useParams();
  const data = useAppSelector(state => state.ingredients.ingredients).find((item: TElement) => item._id === id);
  return(
    <div className={`${styles.Wrapper}`}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <img src={data?.image_large} alt="" className="mb-4" />
      <p className={`${styles.Title} text text_type_main-medium mb-8`}>
        {data?.name}
      </p>
      <ul className={`${styles.List}`}>
        <li className={`${styles.Item}`}>
          <p className={`${styles.Title} text text_type_main-default text_color_inactive mb-2`}>
            Калории,ккал
          </p>
          <p className={`${styles.Title} text text_type_digits-default text_color_inactive`}>
            {data?.calories}
          </p>
        </li>
        <li className={`${styles.Item}`}>
          <p className={`${styles.Title} text text_type_main-default text_color_inactive mb-2`}>
            Белки, г
          </p>
          <p className={`${styles.Title} text text_type_digits-default text_color_inactive`}>
            {data?.proteins}
          </p>
        </li>
        <li className={`${styles.Item}`}>
          <p className={`${styles.Title} text text_type_main-default text_color_inactive mb-2`}>
            Жиры, г
          </p>
          <p className={`${styles.Title} text text_type_digits-default text_color_inactive`}>
            {data?.fat}
          </p>
        </li>
        <li className={`${styles.Item}`}>
          <p className={`${styles.Title} text text_type_main-default text_color_inactive mb-2`}>
            Углеводы, г
          </p>
          <p className={`${styles.Title} text text_type_digits-default text_color_inactive`}>
            {data?.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  )
}
