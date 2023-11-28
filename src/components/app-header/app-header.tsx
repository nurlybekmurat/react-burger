import { FC  } from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';

export const AppHeader: FC = () => {
  const profileStyles = {
    flexBasis: '35%',
  }

  return (
    <div className={`${styles.AppHeaderWrapper} mb-10`}>
      <header className={`${styles.AppHeader} pt-4 pb-4 mb-10}`}>
        <nav className={styles.AppHeaderMenu}>
          <NavLink to={'/'} className={({ isActive }) => isActive ? 'active' : ''}>
            {({isActive}) => (
              <div className={`${styles.AppHeaderLink} text text_type_main-default pl-5 pr-5 pt-4 pb-4`}>
                <div className={`${styles.AppHeaderIcon} pr-2`}>
                  <BurgerIcon type={ isActive ? "primary" : "secondary" } />
                </div>
                <span className={ !isActive ? 'text_color_inactive' : '' }>Конструктор</span>
              </div>
            )}
          </NavLink>
          <NavLink to={'/order-list'} className={({ isActive }) => isActive ? 'active' : ''}>
            {({isActive}) => (
              <div className={`${styles.AppHeaderLink} text text_type_main-default pl-5 pr-5 pt-4 pb-4`}>
                <div className={`${styles.AppHeaderIcon} pr-2`}>
                  <ListIcon type={ isActive ? "primary" : "secondary" } />
                </div>
                <span className={ !isActive ? 'text_color_inactive' : '' }>Лента заказов</span>
              </div>
            )}
          </NavLink>
        </nav>
        <Logo />
        <NavLink to={'/profile'} style={profileStyles} className={({ isActive }) => isActive ? 'active' : '' }>
          {({isActive}) => (
            <div className={`${styles.AppHeaderLink} text text_type_main-default pl-5 pr-5 pt-4 pb-4`}>
              <div className={`${styles.AppHeaderIcon} pr-2`}>
                <ProfileIcon type={ isActive ? "primary" : "secondary" } />
              </div>
              <span className={ !isActive ? 'text_color_inactive' : ''}>Личный кабинет</span>
            </div>
          )}
        </NavLink>
      </header>
    </div>
  )
}

