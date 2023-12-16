import { ingredientDetailReducer, initialStateIngredientDetail } from '../services/ingredient-detail/reducers';
import { getIngredientDetail, clearIngredientDetail } from '../services/ingredient-detail/actions';

describe('Получение ингредиента', () => {
  const ingredient = {
    _id:"643d69a5c3f7b9001cfa093e",
    name:"Филе Люминесцентного тетраодонтимформа",
    type:"main",
    proteins:44,
    fat:26,
    carbohydrates:85,
    calories:643,
    price:988,
    image:"https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
    uid: '643d69',
    index: 1,
    id: '777'
  }
 
  it('При вызове getIngredientDetail ингредиент корректно добавляется в хранилище', () => {
    const result = ingredientDetailReducer(initialStateIngredientDetail, getIngredientDetail(ingredient));
    expect(result.ingredientDetail).toEqual(ingredient)
  })

  it('Очистка состояние ингредиента', () => {
    const result = ingredientDetailReducer(initialStateIngredientDetail, clearIngredientDetail());
    expect(result.ingredientDetail).toEqual(null)
  })
})