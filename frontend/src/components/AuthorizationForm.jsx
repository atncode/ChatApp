import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { authActions } from '../store/auth.slice';
import './AuthorizationForm.css';
import cn from 'classnames';

const AuthorizationForm = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  const fieldClass = cn('form-control', {
    'is-invalid': authFailed,
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
          try {
            const response = await axios.post('/api/v1/login', values);
            const token = response.data.token;
            dispatch(authActions.addToken({ token }));
            navigate('/');
          } catch(err) {
            if (err instanceof AxiosError) {
              setAuthFailed(true);
            }
            throw err;
          }
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
                ref={inputRef}
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
            {authFailed && (<div className="auth-error" >Неверные имя пользователя или пароль</div>)}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
          </Form>
        )}
      </Formik>
  );
};

export default AuthorizationForm;
