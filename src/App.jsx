import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngridients } from './components/burger-ingridients/burger-ingridients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import { loadPost } from './utils/burger-api';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const[data, setData] = useState([]);

  useEffect(() => {
    loadPost(API_URL).then(data => {
      setData(data.data);
    }).catch(error => {
      return error.message;
    });
  }, []);

  return (
    <div className={styles.App}>
      <AppHeader/>
      <main className='constructor pl-5 pr-5 container'>
        <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
        <div className='constructor-wrapper'>
          <BurgerIngridients data={data} />
          <BurgerConstructor data={data} />
        </div>
      </main>
    </div>
  );
}

export default App;
