import {
  GET_INGREDIENT_DETAIL,
  CLEAR_INGREDIENT_DETAIL,
  TIngredientDetailActions,
} from './actions';
import { TElement } from "../../utils/types";

type TIngredientState = {
  ingredientDetail: TElement | null
}

export const initialStateIngredientDetail: TIngredientState = {
  ingredientDetail: null
}

export const ingredientDetailReducer = (state: TIngredientState = initialStateIngredientDetail, action: TIngredientDetailActions): TIngredientState => {
  switch (action.type) {
    case GET_INGREDIENT_DETAIL: {
      return {
        ...state,
        ingredientDetail: { ...action.element }
      }
    }
    case CLEAR_INGREDIENT_DETAIL: {
      return {
        ...state,
        ingredientDetail: null
      }
    }
    default: {
      return state
    }
  }
}