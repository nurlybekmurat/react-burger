import { FC } from 'react';
import styles from './order-card.module.css';
import { getIngredientImages } from '../../../../utils/utils';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TElement, TOrderFeedOptions } from '../../../../utils/types';
import { useAppSelector } from '../../../../hooks';

export const OrderCard: FC<{ data: TOrderFeedOptions}> = ({ data }) => {
  let count = 7;
  const orderDate = new Date(data.createdAt);
  const { ingredients } = useAppSelector(state => state.ingredients);
  let totalPrice: number = 0;
  let orderIngredients: TElement[] = [];
  const images = getIngredientImages(ingredients, data.ingredients);

  if (ingredients.length) {
    data.ingredients.forEach((ingredient: string) => {
      ingredients.forEach((element) => {
        if (element._id === ingredient) {
          if (element.type === 'bun') {
            totalPrice = totalPrice + (element.price * 2)
            orderIngredients = [...orderIngredients, element]
          } else {
            totalPrice = totalPrice + element.price
            orderIngredients = [...orderIngredients, element]
          }
        }
      })
    })
  }

  return (
    <div className={`${styles.OrderCard} p-6 mb-4`}>
    <div className={`${styles.OrderCardHeader} mb-6`}>
      <p className="text text_type_digits-default">{data.number}</p>
      <p className="text text_type_main-default text_color_inactive">
        <FormattedDate date={orderDate} />
      </p>
    </div>
    <h2 className={`${styles.OrderCardTitle}text text_type_main-medium mb-6`}>
      { data.name }
    </h2>
    <div className={`${styles.OrderCardIngredients}`}>
      <div className={`${styles.CardIngredientsIcons}`}>
        { 
          images.map((item, index) => {
          if (index >= 5) return;
            return (
              <div 
                  key={item._id}
                  className={`${styles.IconWrapper}`}
                  data-contet={data.ingredients.length}
                  style={{ zIndex: count-- }}
                >
                <img 
                  className={`${styles.CardIngredientIcon}`} 
                  src={item.image_mobile} alt={item.name} 
                  width={64}
                  height={64}
                />
              </div>
            )
          })
        }
        {
          images.length > 6 && (
          <div 
            key={images[6]._id}
            className={`${styles.IconWrapper}`}
            data-contet={data.ingredients.length}
          >
            <p className={`${styles.IconWrapperCount} text text_type_digits-default`}>+{images.length - 6}</p>
            <img 
              className={`${styles.CardIngredientIcon} disabled`} 
              src={images[6].image_mobile} alt={images[6].name} 
              width={64}
              height={64}
              style={{ zIndex: 1 }}
            />
          </div>
          )
        }
      </div>
      <p className={`${styles.OrderCardPrice} text text_type_digits-default`}>
        { totalPrice }
        <CurrencyIcon type="primary" />
      </p>
    </div>
  </div>
  )
}