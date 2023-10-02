import { useState } from 'react';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingridients } from './ingridients/ingridients';
import styles from './burger-ingridients.module.css';

export const BurgerIngridients = ({data}) => {
  const [current, setCurrent] = useState('bun');

  return (
    <section className='BurgerIngridients'>
      <div className={`${styles.Tabs} mb-10`}>
        <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>      
      <div className={`${styles.Ingredients} custom-scroll`}>
        <Ingridients data={data} type={'bun'} title={'Булки'} />
        <Ingridients data={data} type={'sauce'} title={'Соусы'} />
        <Ingridients data={data} type={'main'} title={'Начинки'} />
      </div>
    </section>
  )
}

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};