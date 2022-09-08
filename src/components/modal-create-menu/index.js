import "./modal-create-menu.css";

import FormItem from "../form-item";
import ButtonNormal from "../button-normal";
import ModalWrapper from "../modal-wrapper";

const ModalCreateMenu = ({
  newMenuName,
  newMenuPrice,
  newMenuImage,
  handleCreateMenu,
  createModalToggle,
  handleToggleCreateModal,
  handleChangeNewMenuName,
  handleChangeNewMenuPrice,
  handleChangeNewMenuImage,
}) => {
  return (
    <ModalWrapper
      open={createModalToggle}
      handleCloseModal={handleToggleCreateModal}
    >
      <span className="modal-title">{"메뉴 추가"}</span>
      <FormItem
        label={"이름"}
        placeholder={"맛있는와플"}
        content={newMenuName}
        handleChangeContent={handleChangeNewMenuName}
      />
      <FormItem
        label={"가격"}
        placeholder={"5,000"}
        content={newMenuPrice}
        handleChangeContent={handleChangeNewMenuPrice}
      />
      <FormItem
        label={"상품 이미지"}
        placeholder={"https://foo.bar/baz.png"}
        content={newMenuImage}
        handleChangeContent={handleChangeNewMenuImage}
      />
      <div className="button-wrapper">
        <ButtonNormal
          text={"추가"}
          handleClick={handleCreateMenu}
          bgColor={"#D3FFC3"}
        />
        <ButtonNormal text={"취소"} handleClick={handleToggleCreateModal} />
      </div>
    </ModalWrapper>
  );
};

export default ModalCreateMenu;
