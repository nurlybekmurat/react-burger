import { FC, useState, useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingridients } from './ingridients/ingridients';
import styles from './burger-ingridients.module.css';
import { useAppSelector  } from '../../hooks/index';
import { Spinner } from '../spinner/spinner';

export const BurgerIngridients: FC = () => {
  const [current, setCurrent] = useState<string>('bun');
  const isLoading = useAppSelector(state => state.ingredients.isLoading);  
  const errMessage = useAppSelector(state => state.ingredients.errorText);  

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null)


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
    const callback = (entries: IntersectionObserverEntry[] , observer:IntersectionObserver | null) => {
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
    targets.forEach(target => observer.observe(target!));
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
