import notfound from '../assets/404-D_FLHmTM.svg'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={notfound} />
      <h1 className="h4 text-muted">{t('titles.pageNotFound')}</h1>
      <p className="text-muted">
        {t('p.goto')}
        <a href="/">
          {t('links.toMainPage')}
        </a>
      </p>
    </div>
  )
}

export default NotFoundPage
