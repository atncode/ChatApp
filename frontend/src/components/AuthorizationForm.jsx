import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router';
import './AuthorizationForm.css';
import cn from 'classnames';
import { useLoginMutation } from '../api';

const AuthorizationForm = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [login, { isError }] = useLoginMutation();

  const fieldClass = cn('form-control', {
    'is-invalid': isError,
  });

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values) => {
          const credentials = await login(values).unwrap();
          localStorage.setItem('user', JSON.stringify(credentials));
          // dispatch(authActions.setCredentials(credentials));
          navigate('/');
        }}
      >
        {() => (
          <Form className="col-12 col-md-6 mt-3 mt-md-0">
            <h1 className="text-center mb-4">Войти</h1>
            <div className="form-floating mb-3">
              <Field
                id="username"
                name="username"
                className={fieldClass}
                placeholder="Ваш ник"
                innerRef={inputRef}
              />
              <label htmlFor="username">Ваш ник</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              id="password"
              type="password"
              name="password"
              className={fieldClass}
              placeholder="Пароль"
            />
            <label className="form-label" htmlFor="password">Пароль</label>
            {isError && (<div className="auth-error" >Неверные имя пользователя или пароль</div>)}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
          </Form>
        )}
      </Formik>
  );
};

export default AuthorizationForm;

