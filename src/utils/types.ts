export type TElement = {
  readonly _id: string,
  readonly name: string,
  readonly price: number,
  readonly image: string,
  readonly image_large: string,
  readonly image_mobile: string,
  readonly type: string,
  readonly calories: number,
  readonly carbohydrates: number,
  readonly fat: number,
  readonly proteins: number,
  __v: number,
  readonly uid: string,
  index: number,
  id?: string
}

export type TElementIngredient = {
  readonly _id: string,
  readonly name: string,
  readonly price: number,
  readonly image: string,
  readonly image_large: string,
  readonly image_mobile: string,
  readonly type: string,
  readonly calories: number,
  readonly carbohydrates: number,
  readonly fat: number,
  readonly proteins: number,
  readonly __v: number,
}

export type TElementState = {
  data: TElement,
  id: string,
  type: string,
}

export type TOrderOptions = {
  createdAt: string,
  ingredients: TElement[],
  name: string,
  number: number,
  owner: {
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string
  }
  price: number,
  status: string
  updatedAt: string
  _id: string
}

export type TOrderResponse = {
  name: string,
  order: TOrderOptions,
  success: boolean
}

export type TUserInfo = {
  success: boolean
  user: {
    name: string,
    email: string
  }
}

export type TUserState = {
  userName: string,
  userEmail: string,
  userInfoRequest: boolean,
  userRefreshRequest: boolean,
  userInfoFailed: boolean,
  authChecked: boolean
}

export type TForgotPass = {
  success: boolean,
  message: string
}

export type TUserLogin = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: {
      email: string,
      name: string
  }
}
export type TOrder = {
  number: string
  order: TOrderOptions
  success: boolean
}

export type TOrderFeed = {
  success: boolean,
  orders: TOrderFeedOptions[],
  total: number,
  totalToday: number
}

export type TOrderFeedOptions = {
  _id: string,
  ingredients: string[],
  name: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string
}

export type TSameOrderIngredient = TElement & {
  quantity: number
}