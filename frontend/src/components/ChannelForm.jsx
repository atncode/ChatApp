import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { useAddChannelMutation, useEditChannelMutation } from '../api';
import { uiActions } from '../store/ui';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


const ChannelForm = ({ inputRef }) => {
  const dispatch = useDispatch();
  const [ addChannel, { isLoading: isLoadingAddChannel } ] = useAddChannelMutation();
  const [ editChannel, { isLoading: isLoadingEditChannel } ] = useEditChannelMutation();
  const channels = useSelector((state) => state.auth.channels);
  const ui = useSelector((state) => state.ui);
  const { modal, channelNameForRename } = ui;
  const { type, extra } = modal;
  const { t } = useTranslation();

  const uiMap = {
    'addChannel': { initialName: '', isLoading: isLoadingAddChannel },
    'renameChannel': { initialName: channelNameForRename, isLoading: isLoadingEditChannel },
  };

  const actionsMap = {
    'addChannel': {
      fn: (data) => addChannel(data).unwrap(),
    },
    'renameChannel': {
      fn: (data) => editChannel(data).unwrap(),
    },
  };

  const notifyType = {
    'addChannel': {
      success: () => toast.success(t('notifications.chnlcreated')),
      failed: () => toast.error(t('notifications.errors.addChnl')),
    },
    'renameChannel': {
      success: () => toast.success(t('notifications.chnlrenamed')),
      failed: () => toast.error(t('notifications.errors.renameChnl')),
    },
  };


  const schema = yup.object().shape({
    name: yup.string()
      .min(3, t('validation.errors.min3'))
      .max(20, t('validation.errors.max'))
      .required(t('validation.errors.required'))
      .notOneOf(Object.values(channels.map(({ name }) => (name))), t('validation.errors.notOneOf')),
  });

  return (
    <Formik
      initialValues={{ name: uiMap[type].initialName }}
      enableReinitialize={true}
      validationSchema={schema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={ async (values, { resetForm }) => {
        const data = (type === 'addChannel') ? values : { id: extra.channelId, name: values };
        try {
          await actionsMap[type].fn(data);
          notifyType[type].success();
        } catch (err) {
          notifyType[type].failed();
        }
        resetForm();
        dispatch(uiActions.setIsModalOpened(false));
      }}
    >
    {({ errors, touched }) => (
      <Form>
        <div>
          <Field
            name="name"
            id="name"
            innerRef={inputRef}
            className={cn('mb-2 form-control', {
              'is-invalid': errors.name && touched.name,
            })}
          />
          <label htmlFor="name" className="visually-hidden">Имя канала</label>
            {errors.name && touched.name ? (<div className='invalid-feedback'>{errors.name}</div>) : null}
            <div className="d-flex justify-content-end">
              <button className="me-2 btn btn-secondary" type="button"
                onClick={() => dispatch(uiActions.setIsModalOpened(false))}
              >{t('buttons.cancel')}</button>
              <button className="btn btn-primary" type="submit"
                disabled={uiMap[type].isLoading}
              >{t('buttons.send')}</button>
            </div>
        </div>
      </Form>
    )}
    </Formik>
  )
};

export default ChannelForm;
