import { useEffect, FC  } from 'react';
import styles from './App.module.css';
import { AppHeader } from '../app-header/app-header';
import { getIngredients } from '../../services/ingredients/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ProtectedRoute } from '../protected-route/protected-route';
import { LoginPage } from '../../pages/login-page/login-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { BurgerConstructorPage } from '../../pages/burger-constructor-page/burger-constructor-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { Layout } from '../layout/layout';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { ProfileSettings } from '../../pages/profile-page/profile-settings/profile-settings';
import { Orders } from '../../pages/profile-page/orders/orders';
import { OrderList } from '../../pages/order-list/order-list';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { getCookie } from '../../utils/utils';
import { useAppSelector, useAppDispatch  } from '../../hooks/index';
import { Modal } from '../modal/modal';
import { IngridientDetail } from '../burger-ingridients/ingridients/ingridient-detail/ingridient-detail';


const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const isAllowed = getCookie('token') ? true : false;
  const forgotPasswordState = useAppSelector(state => state.recoverPassword.emailRecoverSuccess);
  const navigate = useNavigate()
  const handleClose = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.App}>
        <AppHeader/>
        <Layout>
          <Routes location={state?.backgroundLocation || location}>
            <Route path="/" element={<BurgerConstructorPage />} />
            <Route path="/login" element={
              <ProtectedRoute isAllowed={!isAllowed} link={'profile'}>
                <LoginPage />
              </ProtectedRoute>
            } /> 
            <Route path="/register" element={
              <ProtectedRoute isAllowed={!isAllowed} link={'profile'}>
                <RegisterPage />
              </ProtectedRoute>
            } /> 
            <Route path="/forgot-password" element={
              <ProtectedRoute isAllowed={!isAllowed} link={'profile'}>
                <ForgotPasswordPage />
              </ProtectedRoute>
            } /> 
            <Route path="/reset-password" element={
              <ProtectedRoute isAllowed={forgotPasswordState} link={'forgot-password'}>
                <ResetPasswordPage />
              </ProtectedRoute>
            } />
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="/profile" element={
              <ProtectedRoute isAllowed={isAllowed} link={'login'}>
                <ProfilePage />
              </ProtectedRoute>
            }>
              <Route
                path="/profile"
                element={<ProfileSettings />}
              />
              <Route
                path="/profile/orders"
                element={<Orders />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/order-list" element={<OrderList />} />
          </Routes>
          { state?.backgroundLocation && (
            <Routes location={location}>
              <Route path="/ingredients/:id" element={
                <Modal handleClose={handleClose} modalTitle={'Детали ингридиента'}>
                  <IngridientDetail /> 
                </Modal>}
              />
            </Routes>
          )}
        </Layout>
      </div>
    </DndProvider>
  );
}

export default App;
