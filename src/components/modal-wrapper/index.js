import "./modal-wrapper.css";
import Dim from "../dim";

const ModalWrapper = ({ children, handleCloseModal }) => {
  return (
    <>
      <Dim handleCloseModal={handleCloseModal} />
      <div className="modal-wrapper">{children}</div>
    </>
  );
};

export default ModalWrapper;
