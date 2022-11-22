import { Rating } from '@mui/material';
import ButtonNormal from '../button-normal';
import {
  Wrapper,
  ButtonWrapper,
  RatingWrapper,
  ReviewTextarea,
} from './menu-review-new.styled';

interface MenuReviewNew {
  newReviewRating: number;
  newReviewContent: string;
  handleSubmitCreate: () => void;
  handleChangeRating: (e: React.SyntheticEvent<Element, Event>) => void;
  handleChangeContent: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const MenuReviewNew: React.FC<MenuReviewNew> = ({
  newReviewRating,
  newReviewContent,
  handleSubmitCreate,
  handleChangeRating,
  handleChangeContent,
}: MenuReviewNew) => {
  return (
    <Wrapper>
      <RatingWrapper>
        <Rating
          name="simple-controlled"
          value={Number(newReviewRating) || 0}
          onChange={handleChangeRating}
        />
      </RatingWrapper>
      <ReviewTextarea
        placeholder="리뷰를 입력하세요."
        value={newReviewContent}
        onChange={handleChangeContent}
      />
      <ButtonWrapper>
        <ButtonNormal
          text="저장"
          handleClick={handleSubmitCreate}
          bgColor="#D3FFC3"
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default MenuReviewNew;
