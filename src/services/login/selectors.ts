import { RootState } from "../store";

export const getLoginData = (state: RootState) => state.login.loginData?.success;