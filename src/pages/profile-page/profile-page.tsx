import { FC } from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logOut } from '../../services/logout/actions';
import { useAppDispatch  } from '../../hooks/index';
import { getCookie } from '../../utils/utils';
import styles from './profile-page.module.css';


export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const token = getCookie('refreshToken');
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logOut(token));
    if (token) {
      navigate('/');
    }
  }
  return (
    <div className={`${styles.Wrapper} mt-30`}>
      <div className={styles.NavSidebar}>
        <NavLink to={'/profile'} className={`${styles.NavSidebarLink} text text_type_main-medium`}>
          {({isActive}) => (
            <span className={ !isActive ? 'text_color_inactive' : '' }>Профиль</span>
          )}
        </NavLink>
        <NavLink to={'/profile/orders'} className={`${styles.NavSidebarLink} text text_type_main-medium`}>
          {({isActive}) => (
            <span className={ !isActive ? 'text_color_inactive' : '' }>История заказов</span>
          )}
        </NavLink>
        <button onClick={logoutHandler} className={`${styles.NavSidebarBtn} text text_type_main-medium text_color_inactive mb-20`}>
          Выход
        </button>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </div>
      <Outlet />
    </div>
  )
}