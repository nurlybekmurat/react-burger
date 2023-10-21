import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED,
} from './actions';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: false,
  errorText: '',
  constructorIngredients: []
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, isLoading: true, errorText: '', }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredients: action.payload, isLoading: false }
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredients: [], isLoading: false, errorText: action.payload }
    }
    default:
      return state
  }
}