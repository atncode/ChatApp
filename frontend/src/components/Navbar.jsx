import { useNavigate, Link } from 'react-router'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const user = localStorage.getItem('user')

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('navigation.main')}</Link>
        {user ? (<button type="button" className="btn btn-primary" onClick={logout}>{t('navigation.logout')}</button>) : null}
      </div>
    </nav>
  )
}

export default Navbar
