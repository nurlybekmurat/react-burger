// import styles from './burger-constructor.module.css';
import { FC } from 'react';
import { BurgerIngridients } from '../../components/burger-ingridients/burger-ingridients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';

export const BurgerConstructorPage: FC = () => {
  return (
    <>
      <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
      <div className='constructor-wrapper'>
        <BurgerIngridients />
        <BurgerConstructor />
      </div>
    </>
  )
}