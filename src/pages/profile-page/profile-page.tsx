import { FC, useState } from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logOut } from '../../services/logout/actions';
import { useAppDispatch, useAppSelector  } from '../../hooks/index';
import { getCookie } from '../../utils/utils';
import styles from './profile-page.module.css';
import { Modal } from '../../components/modal/modal';


export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const token = getCookie('refreshToken');
  const navigate = useNavigate();
  const { logOutFailed } = useAppSelector(state => state.logout);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = () => {
    dispatch(logOut(token));
    if (logOutFailed) {
      setIsOpen(!isOpen);
    }
    if (token && !logOutFailed) {
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
      { isOpen && logOutFailed &&
        <Modal handleClose={() => setIsOpen(false)}>
          <p className="text text_type_main-default">
            Ошибка
          </p>
        </Modal>
      }
    </div>
  )
}