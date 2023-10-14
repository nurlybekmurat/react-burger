import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './App.module.css';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngridients } from './components/burger-ingridients/burger-ingridients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import { getIngredients } from './services/ingredients/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.App}>
        <AppHeader/>
        <main className='constructor pl-5 pr-5 container'>
          <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
          <div className='constructor-wrapper'>
            <BurgerIngridients />
            <BurgerConstructor />
          </div>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
