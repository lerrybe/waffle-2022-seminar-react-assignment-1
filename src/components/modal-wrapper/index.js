import "./modal-wrapper.css";
import Dim from "../dim";

const ModalWrapper = ({ children }) => {
  return (
    <>
      <Dim />
      <div className="modal-wrapper">{children}</div>
    </>
  );
};

export default ModalWrapper;
