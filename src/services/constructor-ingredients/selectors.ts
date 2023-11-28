import { RootState } from "../store";

export const getConstructorIngridients = (state: RootState) => state.ingredientsConstructor.constructorList;
