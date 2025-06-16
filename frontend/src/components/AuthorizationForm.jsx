import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router';
import './AuthorizationForm.css';
import cn from 'classnames';
import { useLoginMutation } from '../api';
import { useTranslation } from 'react-i18next';


const AuthorizationForm = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [login, { isError }] = useLoginMutation();
  const { t } = useTranslation();

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
          console.log('credentials', credentials);
          localStorage.setItem('user', JSON.stringify(credentials));
          navigate('/');
        }}
      >
        {() => (
          <Form className="col-12 col-md-6 mt-3 mt-md-0">
            <h1 className="text-center mb-4">{t('titles.login')}</h1>
            <div className="form-floating mb-3">
              <Field
                id="username"
                name="username"
                className={fieldClass}
                placeholder={t('labels.nickname')}
                innerRef={inputRef}
              />
              <label htmlFor="username">{t('labels.nickname')}</label>
            </div>
          <div className="form-floating mb-4">
            <Field
              id="password"
              type="password"
              name="password"
              className={fieldClass}
              placeholder={t('labels.password')}
            />
            <label className="form-label" htmlFor="password">{t('labels.password')}</label>
            {isError && (<div className="auth-error" >{t('validation.errors.auth')}</div>)}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('buttons.login')}</button>
          </Form>
        )}
      </Formik>
  );
};

export default AuthorizationForm;

