import React, { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import 'bootstrap/scss/bootstrap.scss';
import { setupSocketListeners, removeSocketListeners } from '../sockets.js';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setupSocketListeners(dispatch);
  
    return () => {
      removeSocketListeners();
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />
    </>
  )
}

export default App;
