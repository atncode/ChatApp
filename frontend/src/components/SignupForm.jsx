import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { useCreateNewUserMutation } from '../api'
import { useEffect, useRef } from 'react'
import cn from 'classnames'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

const SignupForm = () => {
  const [creareNewUser, { isLoading, isError }] = useCreateNewUserMutation()
  const inputRef = useRef()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    inputRef.current.focus()
  })

  const schema = yup.object().shape({
    username: yup.string()
      .min(3, t('validation.errors.min3'))
      .max(20, t('validation.errors.max'))
      .required(t('validation.errors.required')),
    password: yup.string()
      .min(6, t('validation.errors.min6'))
      .required(t('validation.errors.required')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], t('validation.errors.oneOf')),
  })

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        const user = { username: values.username, password: values.password }
        const credentials = await creareNewUser(user).unwrap()
        localStorage.setItem('user', JSON.stringify(credentials))
        navigate('/')
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('titles.signup')}</h1>
          <div className="form-floating mb-3">
            <Field
              id="username"
              name="username"
              className={cn('form-control', { 'is-invalid': (errors.username && touched.username) || isError })}
              placeholder={t('labels.username')}
              innerRef={inputRef}
            />
            {errors.username && touched.username ? (<div className="invalid-feedback">{errors.username}</div>) : null}
            <label className="form-label" htmlFor="username">{t('labels.username')}</label>
            {isError ? (<div className="invalid-tooltip"></div>) : null}
          </div>
          <div className="form-floating mb-3">
            <Field
              id="password"
              type="password"
              name="password"
              className={cn('form-control', { 'is-invalid': (errors.password && touched.password) || isError })}
              placeholder={t('labels.password')}
            />
            {errors.password && touched.password ? (<div className="invalid-feedback">{errors.password}</div>) : null}
            {isError ? (<div className="invalid-tooltip"></div>) : null}
            <label className="form-label" htmlFor="password">{t('labels.password')}</label>
          </div>
          <div className="form-floating mb-4">
            <Field
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className={cn('form-control', { 'is-invalid': (errors.confirmPassword && touched.confirmPassword) || isError })}
              placeholder={t('labels.confirmPassword')}
            />
            {errors.confirmPassword && touched.confirmPassword ? (<div className="invalid-feedback">{errors.confirmPassword}</div>) : null}
            {isError && (<div className="auth-error">{t('validation.errors.isExist')}</div>)}
            <label className="form-label" htmlFor="confirmPassword">{t('labels.confirmPassword')}</label>
          </div>
          <button type="submit" disabled={isLoading} className="w-100 mb-3 btn btn-outline-primary">
            {t('buttons.signup')}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm
