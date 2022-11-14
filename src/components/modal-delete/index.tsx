import ButtonNormal from '../button-normal';
import ModalWrapper from '../modal-wrapper';

import { Announcement, ButtonWrapper, Title } from './modal-delete.styled';

interface ModalDelete {
  title: string;
  deleteModalToggle: boolean;
  handleDelete: () => void;
  handleToggleDeleteModal: () => void;
}

const ModalDelete: React.FC<ModalDelete> = ({
  title,
  handleDelete,
  // TODO: deleteModalToggle: 모달 open 여부 결정하는 flag, 이름 다시 짓기
  deleteModalToggle,
  handleToggleDeleteModal,
}: ModalDelete) => {
  return (
    <ModalWrapper
      open={deleteModalToggle}
      handleCloseModal={handleToggleDeleteModal}
    >
      <Title>{title}</Title>
      <Announcement>정말로 삭제하시겠습니까?</Announcement>
      <ButtonWrapper>
        <ButtonNormal
          text="삭제"
          handleClick={handleDelete}
          bgColor="#FFCFCF"
        />
        <ButtonNormal text="취소" handleClick={handleToggleDeleteModal} />
      </ButtonWrapper>
    </ModalWrapper>
  );
};

export default ModalDelete;
