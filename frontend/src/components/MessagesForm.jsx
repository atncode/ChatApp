import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import axios, { AxiosError } from 'axios';
import { authActions } from '../store/auth.slice';
import socket from '../socket';

const MessagesForm = ({ channelId }) => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.auth);
  const { token, username } = state;
  const inputText = useRef();
  useEffect(() => {
    inputText.current?.focus();
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on('newMessage', (payload, err) => {
      if (err) {
        console.log('errrrrrr', err);
      }
      dispatch(authActions.addMessage(payload));
    });
    return () => {
      socket.off('connect');
      socket.off('newMessage');
    };
  }, [dispatch]);

  return (
    <Formik
    initialValues={{ body: '' }}
    onSubmit={ async (values, { resetForm }) => {
      try {
        const newMessage = { body: values.body, channelId, username };
        await axios.post('/api/v1/messages', newMessage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        resetForm();
      } catch(err) {
        if (err instanceof AxiosError) {
          console.log('AxiosError', err);
        }
        resetForm();
        throw err;
      }
    }}
    >
      {() => (
        <Form noValidate="" className="py-1 border rounded-2">
          <div className="input-group">
            <Field
              id="body"
              name="body"
              className="border-0 p-0 ps-2 form-control"
              placeholder="Введите сообщение..."
              innerRef={inputText}
            />
            <button type="submit" disabled="" className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
              </svg>
              <span className="visually-hidden">Отправить</span>
          </button>
          </div>
        </Form>
      )}
    </Formik>
  )
};

export default MessagesForm;