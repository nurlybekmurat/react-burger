import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { register } from '../../services/register/actions';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { response, errorText, isLoading } = useSelector(state => state.register);
  const [isPassType, setIsPassType] = useState(true);
  const [nameValue, setNameValue] = useState('');
  const inputNameRef = useRef(null);
  const [emailValue, setEmailValue] = useState('');
  const inputEmailRef = useRef(null);
  const [passValue, setPassValue] = useState('');
  const inputPassRef = useRef(null);
  
  const onPassIconClick = () => {
    setIsPassType(!isPassType);
  }
  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register(inputNameRef.current.value, inputEmailRef.current.value, inputPassRef.current.value));
    if (response.success) {
      navigate('/login');
    }
  }

  useEffect(() => {
    if (response.success) {
      navigate('/login')
    }
  },[response])

  return (
    <div className='PageWrapper'>
      <h1 className="text text_type_main-medium mb-4">
        Регистрация
      </h1>
      <form onSubmit={registerHandler}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setNameValue(e.target.value)}
          value={nameValue}
          name={'name'}
          error={false}
          ref={inputNameRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
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
        <Button disabled={isLoading} htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
        { errorText &&
          <p className={`ErrorText text text_type_main-default text_color_inactive`}>
            { errorText }
          </p>
        }
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4 mt-20">
        Уже зарегистрированы? <Link className="Link" to={'/login'}>Войти</Link>
      </p>
    </div>
  )
}