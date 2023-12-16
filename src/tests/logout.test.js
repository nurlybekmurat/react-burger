import { logOutReduser, initialStateLogout } from '../services/logout/reducers';
import { logOut } from '../services/logout/actions';

describe('Тестирование Логаута', () => {
  const logoutRes = {
    logOutRequest: true,
    logOutFailed: false,
  }

  it('успешно прошел запрос', () => {
    const result = logOutReduser(initialStateLogout, logOut());
    result.logOutRequest = true;
    expect(result)
      .toEqual(logoutRes)
  })
})