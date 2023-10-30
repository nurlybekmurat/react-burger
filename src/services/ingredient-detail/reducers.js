import {
  GET_INGREDIENT_DETAIL,
  CLEAR_INGREDIENT_DETAIL,
} from './actions';

const initialState = {
  ingredientDetail: null
}

export const ingredientDetailReducer = (state = initialState, action) => {
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