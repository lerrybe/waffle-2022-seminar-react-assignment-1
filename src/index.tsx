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
import StoreDataProvider from './context/StoreDataContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <SessionProvider>
      <StoreDataProvider>
        <MenuDataProvider>
          <EntryRoute />
          <ModalToast />
        </MenuDataProvider>
      </StoreDataProvider>
    </SessionProvider>
  </React.StrictMode>,
);
