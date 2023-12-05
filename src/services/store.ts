import { Action, ActionCreator, combineReducers, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkAction } from 'redux-thunk';
import { ingredientsReducer } from './ingredients/reducers';
import { constructorReducer } from './constructor-ingredients/reducers';
import { ingredientDetailReducer } from './ingredient-detail/reducers';
import { orderReducer } from './order-detail/reducers';
import { registerReducer } from './register/reducers';
import { loginReducer } from './login/reducers';
import { TUserState, userReduser } from './user/reducers';
import { logOutReduser } from './logout/reducers';
import { recoverPasswordReducer } from './forgot-password/reducers';
import { passwordResetReduser } from './reset-password/reducers';
import { TBurgerConstructorActions } from "./constructor-ingredients/actions";
import { ICleanUserInfo } from "./user/actions";
import { socketMiddleware } from "./middleware/customMiddleware";
import { orderFeedActions, TOrderFeedActions } from "./order-feed/actions";
import { orderHistoryActions, TOrderHistoryActions } from "./order-history/actions";
import { orderFeedReducer } from "./order-feed/reducers";
import { orderHistoryReducer } from "./order-history/reducers";
// import { customMiddleware } from '../services/middleware/customMiddleware';

const rootReducer = combineReducers({
  user: userReduser,
  ingredients: ingredientsReducer,
  ingredientsConstructor: constructorReducer,
  ingredientDetail: ingredientDetailReducer,
  orderDetail: orderReducer,
  register: registerReducer,
  login: loginReducer,
  logout: logOutReduser,
  recoverPassword: recoverPasswordReducer,
  resetPassword: passwordResetReduser,
  feedSocket: orderFeedReducer,
  historySocket: orderHistoryReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, socketMiddleware(orderFeedActions), socketMiddleware(orderHistoryActions)],
  enhancers: [compose]
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(customMiddleware())
})

export default store
export type IRootState = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>

type TApplicationActions = TWsApplicationActions | TBurgerConstructorActions | ICleanUserInfo; 
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>

export type TWsApplicationActions = 
| TOrderFeedActions
| TOrderHistoryActions

export type AppDispatch = typeof store.dispatch