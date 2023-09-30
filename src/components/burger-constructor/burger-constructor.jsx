import { useState } from 'react';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientItem } from './ingredient-item/ingredient-item';
import { Modal } from '../modal/modal';
import { OrderDetail } from './order-detail/order-detail';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.BurgerConstructor}`}>
      <div className={`${styles.IngredientItem} mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${data[0]?.name} (верх)`}
          price={data[0]?.price}
          thumbnail={data[0]?.image_mobile}
        />
      </div>
      <ul className={`${styles.IngredientList} custom-scroll`}>
        { data.filter(item => item.type !== 'bun').map(item => (
            <IngredientItem key={item._id} data={item} />
          ))
        }
      </ul>
      <div className={`${styles.IngredientItem} mt-4 mb-10`}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${data[0]?.name} (низ)`}
        price={data[0]?.price}
        thumbnail={data[0]?.image_mobile}
      />
      </div>
      <div className={`${styles.PriceWrapper} pr-2`}>
        <p className="text text_type_digits-medium mr-2">
          {data.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)}
        </p>
        <span className="mr-10">
          <CurrencyIcon type="primary" />
        </span>
        <Button onClick={()=> {setIsOpen(true)}} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
      { isOpen &&     
      <Modal handleClose={() => setIsOpen(false)}>
        <OrderDetail orderId={'034536'} />
      </Modal>}
    </div>
  )
}

IngredientItem.propTypes = {
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}