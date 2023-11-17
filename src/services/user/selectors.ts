import { RootState } from "../store";

export const getUserData = (state: RootState) => state.user;
export const getUserAuth = (state: RootState) => state.user.authChecked;

