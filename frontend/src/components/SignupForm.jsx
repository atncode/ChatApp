import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useCreateNewUserMutation } from '../api';
import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router';


const SignupForm = () => {
  const [ creareNewUser, { isLoading, isError } ] = useCreateNewUserMutation();
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  });

  const schema = yup.object().shape({
    username: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  });

  return (
    <Formik
    initialValues={{
      username: '',
      password: '',
      confirmPassword: '',
    }}
    validationSchema={schema}
    onSubmit={async (values) => {
      const user = { username: values.username, password: values.password };
      const credentials = await creareNewUser(user).unwrap();
      localStorage.setItem('user', JSON.stringify(credentials));
      navigate('/');
    }}
    >
      {({ errors, touched }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">Регистрация</h1>
          <div className="form-floating mb-3">
            <Field
              id="username"
              name="username"
              className={cn('form-control', { 'is-invalid': errors.username && touched.username || isError })}
              placeholder="Имя пользователя"
              innerRef={inputRef}
            />
            {errors.username && touched.username ? (<div className='invalid-feedback'>{errors.username}</div>) : null}
            <label className="form-label" htmlFor="username">Имя пользователя</label>
            {isError ? (<div placement="right" className='invalid-tooltip'></div>) : null}
          </div>
          <div className="form-floating mb-3">
            <Field
              id="password"
              type="password"
              name="password"
              className={cn('form-control', { 'is-invalid': errors.password && touched.password || isError })}
              placeholder="Пароль"
            />
            {errors.password && touched.password ? (<div className='invalid-feedback'>{errors.password}</div>) : null}
            {isError ? (<div placement="right" className='invalid-tooltip'></div>) : null}
            <label className="form-label" htmlFor="password">Пароль</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className={cn('form-control', { 'is-invalid': errors.confirmPassword && touched.confirmPassword || isError })}
              placeholder="Пароль"
            />
            {errors.confirmPassword && touched.confirmPassword ? (<div className='invalid-feedback'>{errors.confirmPassword}</div>) : null}
            {isError && (<div className="auth-error" >Такой пользователь уже существует</div>)}
            <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
          </div>
          <button type="submit" disabled={isLoading} className="w-100 mb-3 btn btn-outline-primary">
            Зарегистрироваться
          </button>
        </Form>
      )}
    </Formik>
  )
};

export default SignupForm;
