import { Link } from 'react-router'
import AuthorizationForm from './AuthorizationForm.jsx'
import avatar from '../assets/avatar.jpg'
import { useTranslation } from 'react-i18next'

const Card = () => {
  const { t } = useTranslation()

  return (
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={avatar} className="rounded-circle" alt="Войти" />
        </div>
        <AuthorizationForm />
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('spans.noacc')}</span>
          <Link to="/signup">{t('links.signup')}</Link>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Card
