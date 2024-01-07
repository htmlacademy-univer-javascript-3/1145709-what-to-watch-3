import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {postLoginData} from '../../store/thunks.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {useNavigate} from 'react-router-dom';
import {selectIsAuthenticated} from '../../store/user/user-slice.selectors.ts';
import {AppRoute} from '../../types/enums.ts';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isValid, setIsValid] = useState(false);
  const [isIncorrectData, setIsIncorrectData] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(AppRoute.Root);
    }
  }, [navigate, isAuthenticated]);

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsValid(false);
    // Код для обновления состояния
    if (evt.target) {
      const {name, value} = evt.target;
      setFormData({...formData, [name]: value});
    }
  };

  const submitAction = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postLoginData(formData)).then((response) => {
      if ('error' in response) {
        setIsIncorrectData(true);
      }
    });
  };

  return (
    <form className="sign-in__form" onSubmit={submitAction} onInvalid={() => setIsValid(true)}>
      <div className="sign-in__fields">

        <div className="sign-in__message">
          {isValid &&
            <p>Please enter a valid email address</p>}
          {isIncorrectData &&
              <p data-testid='incorrect-message'>We can’t recognize this email <br/> and password combination. Please try again. </p>}
        </div>

        <div className="sign-in__field">
          <input className="sign-in__input" onChange={handleFieldChange} value={formData.email} type="email"
            placeholder="Email address" name="email"
            id="email" data-testid='email'
          />
          <label className="sign-in__label visually-hidden" htmlFor="email">Email address</label>
        </div>
        <div className="sign-in__field">
          <input className="sign-in__input" type="password" placeholder="Password" name="password"
            id="password" onChange={handleFieldChange} value={formData.password} data-testid='password'
          />
          <label className="sign-in__label visually-hidden" htmlFor="password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
};
