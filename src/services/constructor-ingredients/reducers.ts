import { TElementState } from '../../utils/types';
import {
  GET_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  GET_BUN_ITEM, 
  MOVE_CONSTRUCTOR_ITEM,
  CLEAR_CONSTRUCTOR_LIST,
  TBurgerConstructorActions
} from './actions';
import update from 'immutability-helper';

type TConstructorState = {
  constructorList: TElementState[]
}

export const initialStateBurgerConstructor: TConstructorState = {
  constructorList: []
}

export const constructorReducer = (state: TConstructorState = initialStateBurgerConstructor, action: TBurgerConstructorActions ): TConstructorState => {
  switch (action.type) {
    case GET_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorList: state.constructorList.find((item: TElementState) => item.type === 'bun') || action.element.type !== 'bun'
        ? [action.element, ...state.constructorList]
        : [...state.constructorList]
      }
    }
    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorList: action.element.type !== 'bun'
          ? state.constructorList.filter((element: TElementState) => element.id !== action.element.id)
          : [...state.constructorList]
      }
    }
    case GET_BUN_ITEM: {
      return {
        ...state,
        constructorList: action.element.type === 'bun'
          ? [...state.constructorList.filter((element: TElementState) => element.type !== 'bun'), action.element]
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