import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

const ModalToast: React.FC = () => {
  // DESC: common default setting
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ModalToast;
