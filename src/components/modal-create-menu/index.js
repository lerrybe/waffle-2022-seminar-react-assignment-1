import "./modal-create-menu.css";

import FormItem from "../form-item";
import ButtonNormal from "../button-normal";
import ModalWrapper from "../modal-wrapper";

const ModalCreateMenu = ({
  newMenu,
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
        content={newMenu && newMenu.name}
        handleChangeContent={handleChangeNewMenuName}
      />
      <FormItem
        label={"가격"}
        placeholder={"5,000"}
        content={newMenu && newMenu.price}
        handleChangeContent={handleChangeNewMenuPrice}
      />
      <FormItem
        label={"상품 이미지"}
        placeholder={"https://foo.bar/baz.png"}
        content={newMenu && newMenu.image}
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
