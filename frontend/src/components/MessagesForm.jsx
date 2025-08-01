import { useEffect, useRef } from 'react'
import { Formik, Form, Field } from 'formik'
import { useAddMessageMutation } from '../api/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const MessagesForm = ({ channelId, username }) => {
  const [addMessage, { isLoading }] = useAddMessageMutation()
  const inputText = useRef()
  const { t } = useTranslation()
  const notify = () => toast.error(t('notifications.errors.sendMsgs'))
  const navigate = useNavigate()

  useEffect(() => {
    inputText.current?.focus()
  }, [channelId])

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={async (values, { resetForm }) => {
        const newMessage = { body: values.body, channelId, username }
        try {
          await addMessage(newMessage).unwrap()
        }
        catch (err) {
          notify()
          if (err.status === 401) {
            navigate('/login')
          }
          throw new Error(err)
        }
        resetForm()
      }}
    >
      {() => (
        <Form noValidate="" className="py-1 border rounded-2">
          <div className="input-group">
            <Field
              id="body"
              name="body"
              aria-label="Новое сообщение"
              className="border-0 p-0 ps-2 form-control"
              placeholder="Введите сообщение..."
              innerRef={inputText}
              autoComplete="off"
            />
            <button type="submit" disabled={isLoading} className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
              </svg>
              <span className="visually-hidden">{t('buttons.send')}</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default MessagesForm
