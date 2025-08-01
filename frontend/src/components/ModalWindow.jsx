import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { uiActions } from '../store/ui'
import ChannelForm from './ChannelForm'
import { useRemoveChannelMutation } from '../api/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const ModalWindow = () => {
  const [removeChannel] = useRemoveChannelMutation()
  const dispatch = useDispatch()
  const ui = useSelector(s => s.ui)
  const { modal, defaultChannelId } = ui
  const { isOpened, type, extra: { channelId } } = modal
  const inputRef = useRef(null)
  const { t } = useTranslation()
  const notifyRemoved = () => toast.success(t('notifications.chnlremoved'))
  const notifyErrRemoved = () => toast.error(t('notifications.errors.removeChnl'))

  const typesModalMap = {
    addChannel: { title: 'Добавить канал' },
    renameChannel: { title: 'Переименовать канал' },
    removeChannel: { title: 'Удалить канал' },
  }

  const modalData = typesModalMap[type]

  if (type === 'addChannel' || type === 'renameChannel') {
    return (
      <Modal
        show={isOpened}
        onHide={() => dispatch(uiActions.setIsModalOpened(false))}
        onEntered={() => {
          if (inputRef.current) {
            inputRef.current.select()
          }
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChannelForm inputRef={inputRef} />
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <Modal show={isOpened} onHide={() => dispatch(uiActions.setIsModalOpened(false))} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalData.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('p.areyoushure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            onClick={() => dispatch(uiActions.setIsModalOpened(false))}
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              try {
                await removeChannel(channelId).unwrap()
                notifyRemoved()
              }
              catch (err) {
                notifyErrRemoved()
                throw new Error(err)
              }

              dispatch(uiActions.setCurrentChannelId(defaultChannelId))
              dispatch(uiActions.setIsModalOpened(false))
            }}
          >
            {t('buttons.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalWindow
