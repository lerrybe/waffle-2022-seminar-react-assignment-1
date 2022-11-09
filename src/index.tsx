import React from 'react';
import ReactDOM from 'react-dom/client';

// import global css
import './styles/global.css';
import './styles/reset.css';

// import components
import EntryRoute from './routes';
import ModalToast from './components/modal-toast';

// import contexts
import SessionProvider from './context/SessionContext';
import MenuDataProvider from './context/MenuDataContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
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
