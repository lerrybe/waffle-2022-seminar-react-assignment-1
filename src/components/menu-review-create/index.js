import './menu-review-create.css';

import { Rating } from '@mui/material';
import ButtonNormal from '../button-normal';

function MenuReviewCreate({
  handleSubmitCreate,
  newReviewRating,
  newReviewContent,
  handleChangeRating,
  handleChangeContent,
}) {
  return (
    <div className="menu-review-create-wrapper">
      <span className="menu-review-create-rating">
        <Rating
          name="simple-controlled"
          value={Number(newReviewRating) || 0}
          onChange={handleChangeRating}
        />
      </span>
      <textarea
        className="menu-review-create-textarea"
        placeholder="리뷰를 입력하세요."
        value={newReviewContent}
        onChange={handleChangeContent}
      />
      <div className="menu-review-create-button">
        <ButtonNormal
          text="저장"
          handleClick={handleSubmitCreate}
          bgColor="#D3FFC3"
        />
      </div>
    </div>
  );
}

export default MenuReviewCreate;
