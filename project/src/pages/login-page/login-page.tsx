import { FormEvent, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import { AppRoute, AuthorizationStatus, PASSWORD_VALIDATION_FAIL_TEXT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/action';
import { AuthData } from '../../types/auth-data';

function LoginPage(): JSX.Element {
  const isAuth =
    useAppSelector((state) => state.authorizationStatus) ===
    AuthorizationStatus.Auth;
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (
        !/^([A-Za-z].*[0-9]|[0-9].*[A-Za-z])$/.test(
          passwordRef.current.value.toString()
        )
      ) {
        toast.error(PASSWORD_VALIDATION_FAIL_TEXT);
        return;
      }

      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value
      });
    }
  };

  if (isAuth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <PageWrapper pageClass="page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  id="email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  id="password"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </PageWrapper>
  );
}

export default LoginPage;
