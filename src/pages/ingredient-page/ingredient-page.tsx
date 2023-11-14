import { useParams } from 'react-router-dom';
import { IngridientDetail } from '../../components/burger-ingridients/ingridients/ingridient-detail/ingridient-detail';
import { useAppSelector } from '../../hooks/index';
import { FC } from 'react';
import { TElement } from '../../utils/types';
import styles from './ingredient-page.module.css';

export const IngredientPage: FC = () => {
  const { id } = useParams();
  const ingredient = useAppSelector(state => state.ingredients.ingredients).find((item: TElement) => item._id === id)

  return (
    <div className={styles.Wrapper}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      { ingredient &&
        <IngridientDetail data={ingredient} /> 
      }
    </div>
  )
}