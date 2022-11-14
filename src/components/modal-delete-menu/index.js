import './modal-delete-menu.css';

import ButtonNormal from '../button-normal';
import ModalWrapper from '../modal-wrapper';

function ModalDelete({
  title,
  handleDelete,
  deleteModalToggle,
  handleToggleDeleteModal,
}) {
  return (
    <ModalWrapper
      open={deleteModalToggle}
      handleCloseModal={handleToggleDeleteModal}
    >
      <span className="modal-title">{title}</span>
      <span className="modal-announcement">정말로 삭제하시겠습니까?</span>
      <div className="button-wrapper">
        <ButtonNormal
          text="삭제"
          handleClick={handleDelete}
          bgColor="#FFCFCF"
        />
        <ButtonNormal text="취소" handleClick={handleToggleDeleteModal} />
      </div>
    </ModalWrapper>
  );
}

export default ModalDelete;
