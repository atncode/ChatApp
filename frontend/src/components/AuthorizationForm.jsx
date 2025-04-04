import React from 'react';
import { Formik, Form } from 'formik';

const AuthorizationForm = () => {
  return (
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={() => {
          console.log('submit!');
        }}
      >
        {() => (
          <Form className="col-12 col-md-6 mt-3 mt-md-0">
            <h1 className="text-center mb-4">Войти</h1>
            <div className="form-floating mb-3">
              <input
                id="username"
                name="username"
                required=""
                onChange={() => console.log('fvbf')}
                value=""
                className="form-control"
                placeholder="Ваш ник"
              />
              <label htmlFor="username">Ваш ник</label>
          </div>
          <div className="form-floating mb-4">
            <input
              id="password"
              type="password"
              name="password"
              required=""
              onChange={() => console.log('fvfsd')}
              className="form-control"
              placeholder="Пароль"
              value=""
            />
            <label className="form-label" htmlFor="password">Пароль</label>
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
          </Form>
        )}
      </Formik>
  );
};

export default AuthorizationForm;
