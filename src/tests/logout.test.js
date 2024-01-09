import { logOutReduser, initialStateLogout } from '../services/logout/reducers';
import { LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILED } from '../services/logout/actions';

describe('Тестирование Логаута', () => {
  it('проверка начального состояния', () => {
    expect(logOutReduser(undefined, {})).toEqual(initialStateLogout);
  })

  it('проверка запроса', () => {
    const result = logOutReduser(initialStateLogout, { type: LOG_OUT_REQUEST });
    expect(result).toEqual({
      logOutRequest: true,
      logOutFailed: false,
    })
  })
  it('проверка успешного запроса', () => {
    const result = logOutReduser(initialStateLogout, { type: LOG_OUT_SUCCESS });
    expect(result).toEqual({
      logOutRequest: false,
      logOutFailed: false,
    })
  })
  it('проверка ошибки запроса', () => {
    const result = logOutReduser(initialStateLogout, { type: LOG_OUT_FAILED });
    expect(result).toEqual({
      logOutRequest: false,
      logOutFailed: true,
    })
  })
})