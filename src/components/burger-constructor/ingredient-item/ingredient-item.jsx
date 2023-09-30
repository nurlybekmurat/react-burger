import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-item.module.css';

export const IngredientItem = ({ data }) => {
  return (
    <li className={`${styles.IngredientItem}`}>
      <div className={`${styles.IngredientItemIcon}`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image_mobile}
      />
    </li>
  );
};

IngredientItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
}