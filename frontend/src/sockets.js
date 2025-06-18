import socket from './socket';
import { authActions } from './store/auth.slice';

const setupSocketListeners = (dispatch) => {
  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });
  socket.on('newMessage', (payload) => {
    dispatch(authActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(authActions.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    dispatch(authActions.removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(authActions.renameChannel(payload));
  });
};


const removeSocketListeners = () => {
  socket.off('connect');
  socket.off('newMessage');
  socket.off('newChannel');
  socket.off('removeChannel');
  socket.off('renameChannel');
};

export { setupSocketListeners, removeSocketListeners };
