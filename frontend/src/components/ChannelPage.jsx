import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth.slice';
import getNoun from '../plural';
import MessagesForm from './MessagesForm';

const ChannelPage = () => {
  const dispatch = useDispatch();
  const [activeDialog, setActiveDialog] = useState({ id: 0, name: '' });
  const token = useSelector((s) => s.auth.token);
  const state = useSelector((s) => s.auth);
  const { channels, messages } = state;

  useEffect(() => {
    async function getChannelsAndMessages() {
      const channelsResponse = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const channels = channelsResponse.data;
      dispatch(authActions.setChannels({ channels }));

      const messagesResponse = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const messages = messagesResponse.data;
      dispatch(authActions.setMessages({ messages }));

      if (channels.length > 0) {
        const { id, name } = channels[0];
        setActiveDialog({ id, name });
      }
    }

    getChannelsAndMessages();
  }, []);

  const isActive = (id) => (activeDialog.id === id ? 'btn-secondary' : '');

  const buildChannelsList = (channels) => channels
    .map(({ id, name }) => <li key={id} className="nav-item w-100">
      <button type="button" onClick={() => setActiveDialog({id, name})} className={`w-100 rounded-0 text-start btn ${isActive(id)}`} >
        <span className="me-1">#</span>{name}
      </button>
    </li>);
  
  const getQuantityOfMsgs = (id) => {
    const count = messages.filter(({ channelId }) => channelId === id).length;
    console.log('count', count);
    return `${count} ${getNoun(count, 'сообщение', 'сообщения', 'сообщений')}`;
  };

  const buildMessagesList = (id) => messages
    .filter(({ channelId }) => channelId === id)
    .map(({ id, body, username }) => <div key={id} className="text-break mb-2"><b>{username}</b>: {body}</div>);


  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {buildChannelsList(channels)}
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{activeDialog.name}</b>
              </p>
              <span className="text-muted">{getQuantityOfMsgs(activeDialog.id)}</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
              {buildMessagesList(activeDialog.id)}
            </div>
            <div className="mt-auto px-5 py-3">
              {<MessagesForm channelId={activeDialog.id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ChannelPage;
