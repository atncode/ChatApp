import { Dropdown, ButtonGroup, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Channel = ({ name, onClick, btncn, tglcn, onRemove, onRename }) => {
  const { t } = useTranslation()

  return (
    <Dropdown as={ButtonGroup} className="d-flex w-100">
      <Button variant="" className={btncn} onClick={onClick}>
        <span className="me-1">#</span>
        {name}
      </Button>

      <Dropdown.Toggle split id="dropdown-split-basic" variant="" className={tglcn}>
        <span className="visually-hidden">{t('spans.chnlmanagment')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={onRemove}>{t('buttons.delete')}</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={onRename}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Channel
