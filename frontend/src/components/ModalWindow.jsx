import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef } from 'react';
import { uiActions } from '../store/ui';
import ChannelForm from './ChannelForm';
import { useRemoveChannelMutation } from '../api';


const ModalWindow = () => {
  const [ removeChannel ] = useRemoveChannelMutation();
  const dispatch = useDispatch();
  const ui = useSelector((s) => s.ui);
  const { modal, defaultChannelId } = ui;
  const { isOpened, type, extra: { channelId } } = modal;
  const inputRef = useRef(null);


  const typesModalMap = {
    'addChannel': { title: 'Добавить канал'},
    'renameChannel': { title: 'Переименовать канал'},
    'removeChannel': { title: 'Удалить канал'},
  };

  const modalData = typesModalMap[type];

  if (type === 'addChannel' || type === 'renameChannel') {
    return (
      <Modal show={isOpened}
        onHide={() => dispatch(uiActions.setIsModalOpened(false))}
        onEntered={() => {
          if (inputRef.current) {
            inputRef.current.select();
          }
        }}
        centered>
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
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary"
            onClick={() => dispatch(uiActions.setIsModalOpened(false))}
          >Отменить</Button>
          <Button variant="danger"
            onClick={() => {
              removeChannel(channelId);
              dispatch(uiActions.setCurrentChannelId(defaultChannelId));
              dispatch(uiActions.setIsModalOpened(false));
            }}
          >Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
};

export default ModalWindow;
