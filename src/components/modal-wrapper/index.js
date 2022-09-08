import "./modal-wrapper.css";

import Dim from "../dim";

const ModalWrapper = ({ children, handleCloseModal, open }) => {
  return (
    <>
      <Dim handleCloseModal={handleCloseModal} />
      <div
        className={
          open ? "modal-wrapper modal-open" : "modal-wrapper modal-close"
        }
      >
        {children}
      </div>
    </>
  );
};

export default ModalWrapper;
