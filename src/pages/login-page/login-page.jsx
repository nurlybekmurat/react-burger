import { useState, useRef, useEffect } from 'react';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../services/login/actions';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginData, errorText, isLoading } = useSelector(state => state.login);
  const [isPassType, setIsPassType] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const inputEmailRef = useRef(null);
  const [passValue, setPassValue] = useState('');
  const inputPassRef = useRef(null);
  const onPassIconClick = () => {
    setIsPassType(!isPassType);
  }
  const loginHandler = () => {
    dispatch(login(inputEmailRef.current.value, inputPassRef.current.value));
  }
  const { logOutRequest } = useSelector(state => state.logout);

  useEffect(() => {
    if (loginData.success && !logOutRequest) {
      navigate('/profile')
    }
  },[loginData.success, navigate, logOutRequest])

  return (
    <div className='PageWrapper'>
      <h1 className="text text_type_main-medium mb-4">
        Вход
      </h1>
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={e => setEmailValue(e.target.value)}
        value={emailValue}
        name={'name'}
        error={false}
        ref={inputEmailRef}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Input
        type={isPassType ? 'password' : 'text'}
        placeholder={'Пароль'}
        onChange={e => setPassValue(e.target.value)}
        icon={ isPassType ? 'ShowIcon' : 'HideIcon'}
        value={passValue}
        name={'name'}
        error={false}
        ref={inputPassRef}
        onIconClick={onPassIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Button onClick={loginHandler} disabled={isLoading} htmlType="button" type="primary" size="medium">
        Войти
      </Button>
      { errorText &&
        <p className={`ErrorText text text_type_main-default text_color_inactive`}>
          { errorText }
        </p>
      }
      <p className="text text_type_main-default text_color_inactive mb-4 mt-20">
        Вы — новый пользователь? <Link className="Link" to={'/register'}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link className="Link" to={'/forgot-password'}>Восстановить пароль</Link>
      </p>
    </div>
  )
}