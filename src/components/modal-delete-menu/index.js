import "./modal-delete-menu.css";

import ButtonNormal from "../button-normal";
import ModalWrapper from "../modal-wrapper";

const ModalDeleteMenu = ({ handleDeleteMenu, handleToggleDeleteModal }) => {
  return (
    <ModalWrapper>
      <span className="modal-title">{"메뉴 삭제"}</span>
      <span className="modal-announcement">{"정말로 삭제하시겠습니까?"}</span>
      <div className="button-wrapper">
        <ButtonNormal
          text={"삭제"}
          handleClick={handleDeleteMenu}
          bgColor={"#FFCFCF"}
        />
        <ButtonNormal text={"취소"} handleClick={handleToggleDeleteModal} />
      </div>
    </ModalWrapper>
  );
};

export default ModalDeleteMenu;
