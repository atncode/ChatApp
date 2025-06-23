import { useGetChannelsQuery, useGetMessagesQuery } from '../api/api.js'
import DefaultChannel from '../components/DefaultChannel.jsx'
import Channel from '../components/Channel.jsx'
import Messages from '../components/Messages.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../store/ui.js'
import cn from 'classnames'
import { authActions } from '../store/auth.slice.js'
import { useEffect } from 'react'
import MessagesForm from '../components/MessagesForm.jsx'
import { getCurrentChannelName, getMessagesCount } from '../channelPageHelpers.js'
import ModalWindow from '../components/ModalWindow.jsx'
import Navbar from '../components/Navbar.jsx'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const ChannelPage = () => {
  const dispatch = useDispatch()
  const { data: initialChannels, isSuccess: isChannelsSuccess, isError: isChannelsError } = useGetChannelsQuery()
  const { data: initialMessages, isSuccess: isMessagesSuccess, isError: isMessagesError } = useGetMessagesQuery()
  const ui = useSelector(state => state.ui)
  const { modal, currentChannelId } = ui
  const { isOpened, type } = modal
  const auth = useSelector(state => state.auth)
  const { username, channels, messages } = auth
  const { t } = useTranslation()

  useEffect(() => {
    if (initialChannels && isChannelsSuccess) {
      dispatch(authActions.getChannels(initialChannels))
    }
    if (isChannelsError) {
      const notify = () => toast.error(t('notifications.errors.loadChnls'))
      notify()
    }
  }, [initialChannels, isChannelsSuccess, isChannelsError, dispatch, t])

  useEffect(() => {
    if (initialMessages && isMessagesSuccess) {
      dispatch(authActions.getMessages(initialMessages))
    }
    if (isMessagesError) {
      const notify = () => toast.error(t('notifications.errors.loadMsgs'))
      notify()
    }
  }, [initialMessages, isMessagesSuccess, isMessagesError, dispatch, t])

  return (
    <>
      <Navbar />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('titles.chnls')}</b>
              <button
                type="button"
                className="p-0 text-primary btn btn-group-vertical"
                onClick={() => {
                  dispatch(uiActions.setIsModalOpened(true))
                  dispatch(uiActions.setTypeModal('addChannel'))
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                </svg>
                <span className="visually-hidden">{t('spans.plus')}</span>
              </button>
              {isOpened && (type === 'addChannel') && <ModalWindow />}
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
              {channels.map(({ id, name, removable }) => (
                <li key={id} className="nav-item w-100">
                  {
                    removable
                      ? (
                          <Channel
                            key={id}
                            name={name}
                            onClick={() => dispatch(uiActions.setCurrentChannelId(id))}
                            btncn={cn('rounded-0 text-start text-truncate', {
                              'btn-secondary': currentChannelId === id,
                            })}
                            tglcn={cn('flex-grow-0', {
                              'btn-secondary': currentChannelId === id,
                            })}
                            onRemove={() => {
                              dispatch(uiActions.setExtraModal(id))
                              dispatch(uiActions.setIsModalOpened(true))
                              dispatch(uiActions.setTypeModal('removeChannel'))
                            }}
                            onRename={() => {
                              dispatch(uiActions.setExtraModal(id))
                              dispatch(uiActions.setIsModalOpened(true))
                              dispatch(uiActions.setTypeModal('renameChannel'))
                              dispatch(uiActions.setChannelNameForRename(name))
                            }}
                          />
                        )
                      : (
                          <DefaultChannel
                            key={id}
                            name={name}
                            onClick={() => dispatch(uiActions.setCurrentChannelId(id))}
                            classes={cn('w-100 rounded-0 text-start btn', {
                              'btn-secondary': currentChannelId === id,
                            })}
                          />
                        )
                  }
                </li>
              ),
              )}
            </ul>
            {isOpened && (type === 'renameChannel') && <ModalWindow />}
            {isOpened && (type === 'removeChannel') && <ModalWindow />}
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>{getCurrentChannelName(currentChannelId, channels)}</b>
                </p>
                <span className="text-muted">{t('messages.key', { count: getMessagesCount(currentChannelId, messages) })}</span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                <Messages currentChannelId={currentChannelId} />
              </div>
              <div className="mt-auto px-5 py-3">
                <MessagesForm channelId={currentChannelId} username={username} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChannelPage
