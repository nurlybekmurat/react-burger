import { 
  REFRESH_USER_INFO_REQUEST, 
  REFRESH_USER_INFO_SUCCESS, 
  REFRESH_USER_INFO_FAILED, 
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  CLEAN_USER_INFO
} from '../services/user/actions';
import { initialStateUser, userReduser } from '../services/user/reducers';

describe('Тестирование пользователя', () => {
  const response = {
    success: true,
    user: {
      name: 'name',
      email: 'email@test'
    }
  }

  it('запрос на обновление информации о пользователя', () => {
    const result = userReduser(initialStateUser, { type: REFRESH_USER_INFO_REQUEST });
    expect(result.userRefreshRequest)
      .toEqual(true)
  })
  it('запрос на обновление информации о пользователя прошла успешна', () => {
    const result = userReduser(initialStateUser, { type: REFRESH_USER_INFO_SUCCESS, payload: response });
    expect(result.userName)
      .toEqual(response.user.name)
  })
  it('ошибка запрос на обновление информации о пользователя', () => {
    const result = userReduser(initialStateUser, { type: REFRESH_USER_INFO_FAILED});
    expect(result.userRefreshFailed)
      .toEqual(true)
  })
  it('запрос на получения информации о пользователя', () => {
    const result = userReduser(initialStateUser, { type: GET_USER_INFO_REQUEST });
    expect(result.userInfoRequest)
      .toEqual(true)
  })
  it('запрос на получения информации о пользователя прошла успешна', () => {
    const result = userReduser(initialStateUser, { type: GET_USER_INFO_SUCCESS, payload: response });
    expect(result.authChecked)
      .toEqual(true)
  })
  it('ошибка запрос на получения информации о пользователя', () => {
    const result = userReduser(initialStateUser, { type: GET_USER_INFO_FAILED});
    expect(result.userInfoFailed)
      .toEqual(true)
  })
  it('очистка состояния', () => {
    const result = userReduser(initialStateUser, { type: CLEAN_USER_INFO});
    expect(result)
      .toEqual(initialStateUser)
  })
})