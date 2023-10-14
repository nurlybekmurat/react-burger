export const GET_INGREDIENT_DETAIL = 'GET_INGREDIENT_DETAIL';
export const CLEAR_INGREDIENT_DETAIL = 'CLEAR_INGREDIENT_DETAIL';

export const getIngredientDetail = (element) => ({
  type: GET_INGREDIENT_DETAIL,
  element
});

export const clearIngredientDetail = () => ({
  type: CLEAR_INGREDIENT_DETAIL
});