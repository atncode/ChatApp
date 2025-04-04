import ReactDOM from 'react-dom/client';
import  './assets/styles.scss';
import App from './components/App.jsx'
import { BrowserRouter } from "react-router";

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
