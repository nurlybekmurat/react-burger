import {
  GET_INGREDIENT_DETAIL,
  CLEAR_INGREDIENT_DETAIL,
  TIngredientDetailActions,
} from './actions';
import { TElement } from "../../utils/types";

type TIngredientState = {
  ingredientDetail: TElement | null
}

const initialState = {
  ingredientDetail: null
}

export const ingredientDetailReducer = (state: TIngredientState = initialState, action: TIngredientDetailActions): TIngredientState => {
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