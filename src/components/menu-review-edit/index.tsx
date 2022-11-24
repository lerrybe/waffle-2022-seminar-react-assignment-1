import { Rating } from '@mui/material';
import ButtonNormal from '../button-normal';

import {
  Wrapper,
  RatingWrapper,
  ButtonWrapper,
  MenuEditTextarea,
} from './menu-review-edit.styled';

interface MenuReviewEdit {
  handleSubmitUpdate: () => void;
  updateReviewRating: number;
  updateReviewContent: string;
  handleChangeRating: (e: React.SyntheticEvent<Element, Event>) => void;
  handleChangeContent: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleCloseWindow: () => void;
}

const MenuReviewEdit: React.FC<MenuReviewEdit> = ({
  handleSubmitUpdate,
  updateReviewRating,
  updateReviewContent,
  handleChangeRating,
  handleChangeContent,
  handleCloseWindow,
}: MenuReviewEdit) => {
  return (
    <Wrapper>
      <RatingWrapper>
        <Rating
          name="simple-controlled"
          value={updateReviewRating || 0}
          onChange={handleChangeRating}
        />
      </RatingWrapper>
      <MenuEditTextarea
        className="menu-review-edit-textarea"
        placeholder="리뷰를 입력하세요."
        value={updateReviewContent}
        onChange={handleChangeContent}
      />
      <ButtonWrapper>
        <ButtonNormal
          text="저장"
          bgColor="#D3FFC3"
          handleClick={handleSubmitUpdate}
        />
        <ButtonNormal text="취소" handleClick={handleCloseWindow} />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default MenuReviewEdit;
