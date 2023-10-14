import {
  GET_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  GET_BUN_ITEM, 
  MOVE_CONSTRUCTOR_ITEM,
  CLEAR_CONSTRUCTOR_LIST
} from './actions';
import update from 'immutability-helper';

const initialState = {
  constructorList: []
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorList: !state.constructorList.find(element => element.type === 'bun') || action.element.type !== 'bun'
        ? [action.element, ...state.constructorList]
        : [...state.constructorList]
      }
    }
    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorList: action.element.type !== 'bun'
          ? state.constructorList.filter((element) => element.id !== action.element.id)
          : [...state.constructorList]
      }
    }
    case GET_BUN_ITEM: {
      return {
        ...state,
        constructorList: action.element.type === 'bun'
          ? [...state.constructorList.filter(element => element.type !== 'bun'), action.element]
          : [...state.constructorList]
      }
    }
    case MOVE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorList: [...update(state.constructorList, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.constructorList[action.dragIndex]]
          ]
        })]
      }
    }
    case CLEAR_CONSTRUCTOR_LIST: {
      return {
        ...state,
        constructorList: []
      }
    }
    default: {
      return state
    }
  }
}