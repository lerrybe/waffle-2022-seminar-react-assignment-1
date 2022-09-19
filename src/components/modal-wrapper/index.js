import { useEffect, useState } from "react";

import "./modal-wrapper.css";

import Dim from "../dim";

const ModalWrapper = ({ children, handleCloseModal, open }) => {
  const [animate, setAnimate] = useState("modal-open");

  useEffect(() => {
    open ? setAnimate("modal-open") : setAnimate("modal-close");
  }, [open]);

  return (
    <>
      <Dim handleCloseModal={handleCloseModal} />
      <div className={`modal-wrapper ${animate}`}>{children}</div>
    </>
  );
};

export default ModalWrapper;
