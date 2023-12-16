import { TElement } from '../../utils/types';
import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED,
  TGetIngredientsActions,
} from './actions';

type TIngredientsState = {
  ingredients: TElement[],
  isLoading: boolean,
  error: boolean,
  errorText: string,
  constructorIngredients: TElement[]
}


const initialStateIngredients = {
  ingredients: [],
  isLoading: false,
  error: false,
  errorText: '',
  constructorIngredients: []
}

export const ingredientsReducer = (state: TIngredientsState = initialStateIngredients, action: TGetIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, isLoading: true, errorText: '', }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredients: action.payload.data, isLoading: false }
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredients: [], isLoading: false, errorText: action.payload }
    }
    default:
      return state
  }
}