import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IngridientDetail } from '../../components/burger-ingridients/ingridients/ingridient-detail/ingridient-detail';
import styles from './ingredient-page.module.css';

export const IngredientPage = () => {
  const { id } = useParams();
  const ingredient = useSelector(state => state.ingredients.ingredients).find(item => item._id === id)

  return (
    <div className={styles.Wrapper}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      { ingredient &&
        <IngridientDetail data={ingredient} /> 
      }
    </div>
  )
}