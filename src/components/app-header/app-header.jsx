import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export const AppHeader = () => {
  return (
    <div className={`${styles.AppHeaderWrapper} mb-10`}>
      <header className={`${styles.AppHeader} pt-4 pb-4 mb-10}`}>
        <nav className={styles.AppHeaderMenu}>
          <a className={`${styles.AppHeaderLink} text text_type_main-default pl-5 pr-5 pt-4 pb-4`} href="/#">
            <div className={`${styles.AppHeaderIcon} pr-2`}>
              <BurgerIcon type="primary" />
            </div>
            Конструктор
          </a>
          <a className={`${styles.AppHeaderLink} text text_type_main-default text_color_inactive pl-5 pr-5 pt-4 pb-4`} href="/#">
            <div className={`${styles.AppHeaderIcon} pr-2`}>
              <ListIcon  type="secondary" />
            </div>
            Лента заказов
          </a>
        </nav>
        <Logo />
        <div className={styles.AppHeaderProfile}>
          <a className={`${styles.AppHeaderLink} text text_type_main-default text_color_inactive pl-5 pr-5 pt-4 pb-4`} href="/#">
              <div className={`${styles.AppHeaderIcon} pr-2`}>
                <ProfileIcon  type="secondary" />
              </div>
              Личный кабинет
          </a>
        </div>
      </header>
    </div>
  )
}

