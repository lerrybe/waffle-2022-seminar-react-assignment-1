import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// import css
import './styles/global.css';
import './styles/reset.css';

// import components
import EntryRoute from './routes';
import ModalToast from './components/modal-toast';

// import contexts
import SessionProvider from './context/SessionContext';
import MenuDataProvider from './context/MenuDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider>
      <MenuDataProvider>
        <EntryRoute />
        <ModalToast />
      </MenuDataProvider>
    </SessionProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
