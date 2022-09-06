import "./modal-update-menu.css";

import FormItem from "../form-item";
import ButtonNormal from "../button-normal";
import ModalWrapper from "../modal-wrapper";

const ModalUpdateMenu = ({
  menuName,
  menuPrice,
  menuImage,
  handleUpdateMenu,
  handleChangeMenuName,
  handleChangeMenuPrice,
  handleChangeMenuImage,
  handleToggleUpdateModal,
}) => {
  return (
    <ModalWrapper>
      <span className="modal-title">{"메뉴 수정"}</span>
      <FormItem
        label={"이름"}
        placeholder={"맛있는와플"}
        content={menuName}
        handleChangeContent={handleChangeMenuName}
      />
      <FormItem
        label={"가격"}
        placeholder={"5,000"}
        content={menuPrice}
        handleChangeContent={handleChangeMenuPrice}
      />
      <FormItem
        label={"상품 이미지"}
        placeholder={"https://foo.bar/baz.png"}
        content={menuImage}
        handleChangeContent={handleChangeMenuImage}
      />
      <div className="button-wrapper">
        <ButtonNormal
          text={"저장"}
          handleClick={handleUpdateMenu}
          bgColor={"#D3FFC3"}
        />
        <ButtonNormal text={"취소"} handleClick={handleToggleUpdateModal} />
      </div>
    </ModalWrapper>
  );
};

export default ModalUpdateMenu;
