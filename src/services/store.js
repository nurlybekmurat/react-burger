import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from './ingredients/reducers';
import { constructorReducer } from './constructor-ingredients/reducers';
import { ingredientDetailReducer } from './ingredient-detail/reducers';
import { orderReducer } from './order-detail/reducers';
import { registerReducer } from './register/reducers';
import { loginReducer } from './login/reducers';
import { userReduser } from './user/reducers';
import { logOutReduser } from './logout/reducers';
import { recoverPasswordReducer } from './forgot-password/reducers';
import { passwordResetReduser } from './reset-password/reducers';
// import { customMiddleware } from '../services/middleware/customMiddleware';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientsConstructor: constructorReducer,
  ingredientDetail: ingredientDetailReducer,
  orderDetail: orderReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReduser,
  logout: logOutReduser,
  recoverPassword: recoverPasswordReducer,
  resetPassword: passwordResetReduser
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(customMiddleware())
})