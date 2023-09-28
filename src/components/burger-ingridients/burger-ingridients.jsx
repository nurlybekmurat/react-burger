import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingridients } from './ingridients/ingridients';
import styles from './burger-ingridients.module.css';

export const BurgerIngridients = ({data}) => {
  const [current, setCurrent] = useState('one');
  return (
    <section className='BurgerIngridients'>
      <div className={`${styles.Tabs} mb-10`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
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