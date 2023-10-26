import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import { AppHeader } from './components/app-header/app-header';
import { getIngredients } from './services/ingredients/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoute } from './components/protected-route/protected-route';
import { LoginPage } from './pages/login-page/login-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { BurgerConstructorPage } from './pages/burger-constructor-page/burger-constructor-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { Layout } from './components/layout/layout';
import { RegisterPage } from './pages/register-page/register-page';
import { ForgotPasswordPage } from './pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from './pages/reset-password-page/reset-password-page';
import { ProfileSettings } from './pages/profile-page/profile-settings/profile-settings';
import { Orders } from './pages/profile-page/orders/orders';
import { OrderList } from './pages/order-list/order-list';
import { IngredientPage } from './pages/ingredient-page/ingredient-page';
import { getCookie } from './utils/utils';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;
  const isAllowed = getCookie('token') ? true : false;
  const forgotPasswordState = useSelector(state => state.recoverPassword.emailRecoverSuccess)

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
        </Layout>
      </div>
    </DndProvider>
  );
}

export default App;
