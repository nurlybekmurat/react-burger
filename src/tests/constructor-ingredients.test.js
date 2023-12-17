import { getBunItem, getConstructorItem, clearConstructorList, deleteConstructorItem, moveConstructorItem } from "../services/constructor-ingredients/actions";
import { constructorReducer, initialStateBurgerConstructor } from "../services/constructor-ingredients/reducers";
import update from "immutability-helper";


describe('Тестирование редьюсера конструктора бургера', () => {
  const ingredient = {
    data: {
      _id:"643d69a5c3f7b9001cfa093e",
      name:"Ингредиент 1",
      type:"main",
      proteins:44,
      fat:26,
      carbohydrates:85,
      calories:643,
      price:988,
      image:"https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
    },
    id: 777,
    type: "sauce",
  }

  const ingredientBun = {
    data: {
      _id:"643d69a5c3f7b9001cfa093e",
      name:"Ингредиент 1",
      type:"main",
      proteins:44,
      fat:26,
      carbohydrates:85,
      calories:643,
      price:988,
      image:"https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
    },
    id: 777,
    type: "bun",
  }

  const ingredients = [
    {
      data: {
        _id:"643d69a5c3f7b9001cfa093e",
        name:"Ингредиент 1",
        type:"main",
        proteins:44,
        fat:26,
        carbohydrates:85,
        calories:643,
        price:988,
        image:"https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
      },
      id: 777,
      type: "sauce",
    },
    {
      data: {
        _id:"643d69a5c3f7b9001cfa093e",
        name:"Ингредиент 2",
        type:"main",
        proteins:44,
        fat:26,
        carbohydrates:85,
        calories:643,
        price:988,
        image:"https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
      },
      id: 666,
      type: "sauce",
    },
    {
      data: {
        _id:"643d69a5c3f7b9001cfa093e",
        name:"Ингредиент 3",
        type:"main",
        proteins:44,
        fat:26,
        carbohydrates:85,
        calories:643,
        price:988,
        image:"https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
      },
      id: 555,
      type: "sauce",
    }
  ]
  
  it('Тест должен вернуть начальное состояние', () => {
    expect(constructorReducer(undefined,[])).toEqual(initialStateBurgerConstructor)
  })

  it('При использовании "getConstructorItem" ингредиент должен корректно добавляться в массив ингридиентов', () => {
    const result = constructorReducer(initialStateBurgerConstructor, getConstructorItem(ingredient));
    expect(result.constructorList[0]).toBe(ingredient)
  })

  it('При использовании "deleteConstructorItem" ингредиент должен коректно удаляться из массива ингредиентов', () => {
    const result = constructorReducer(initialStateBurgerConstructor, deleteConstructorItem(ingredient))
    expect(result).toEqual(initialStateBurgerConstructor)
  })

  it('При перетаскивании ингредиента с первого места на второе в конструкторе, массив корректно сортируется', () => {
    const state = {
        ...initialStateBurgerConstructor,
        constructorList: [...ingredients]
    }
    const dragIndex = 0;
    const hoverIndex = 1;
    const sorted = update(ingredients, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, ingredients[dragIndex]]
      ]
    })

    const result = constructorReducer(state, moveConstructorItem(1, 0));
    expect(result.constructorList).toEqual(sorted)
  })

  it('При использовании "getBunItem" булка должна корректно добавляться', () => {
    const result = constructorReducer(initialStateBurgerConstructor, getBunItem(ingredientBun));
    expect(result).toEqual({
        ...initialStateBurgerConstructor,
        constructorList: [
          {
            ...ingredientBun
          }
        ]
    })
  })

  it('При использовании контсруктор бургера должен корректно очищаться от всех ингридиентов', () => {
    const state = {
      constructorList: ingredients,
    }

    const result = constructorReducer(state, clearConstructorList());
    expect(result).toEqual(initialStateBurgerConstructor)
  })
})