import { useState, useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingridients } from './ingridients/ingridients';
import styles from './burger-ingridients.module.css';
import { useSelector } from 'react-redux';
import { Spinner } from '../../components/spinner/spinner';

export const BurgerIngridients = () => {
  const [current, setCurrent] = useState('bun');
  const isLoading = useSelector(state => state.ingredients.isLoading);  
  const errMessage = useSelector(state => state.ingredients.errorText);  

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const scrollRef = useRef(null)


  useEffect(() => {
    const targets = [
      bunRef.current,
      sauceRef.current,
      mainRef.current
    ]
    const options = {
      root: scrollRef.current,
      rootMargin: '0px 0px -90% 0px'
    }
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
         if (entry.target === bunRef.current) {
          setCurrent('bun')
         }
         if (entry.target === sauceRef.current) {
          setCurrent('sauce')
         }
         if (entry.target === mainRef.current) {
          setCurrent('main')
         }
        }
      })
    }
    const observer = new IntersectionObserver(callback, options);
    targets.forEach(target => observer.observe(target));
  }, []);

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
      <div className={`${styles.Ingredients} custom-scroll`} ref={scrollRef} >
      { isLoading &&
          <Spinner/>
        }
        { errMessage &&
          <p className={`${styles.ErrMessage} text text_type_main-default`}>{errMessage}</p>
        }
        <Ingridients type={'bun'} title={'Булки'} ref={bunRef} />
        <Ingridients type={'sauce'} title={'Соусы'} ref={sauceRef} />
        <Ingridients type={'main'} title={'Начинки'} ref={mainRef} />
      </div>
    </section>
  )
}
