import './menu-review-edit.css';

import { Rating } from '@mui/material';
import ButtonNormal from '../button-normal';

function MenuReviewEdit({
  handleSubmitUpdate,
  updateReviewRating,
  updateReviewContent,
  handleChangeRating,
  handleChangeContent,
  handleCloseWindow,
}) {
  return (
    <div className="menu-review-edit-wrapper">
      <span className="menu-review-edit-rating">
        <Rating
          name="simple-controlled"
          value={Number(updateReviewRating) || 0}
          onChange={handleChangeRating}
        />
      </span>
      <textarea
        className="menu-review-edit-textarea"
        placeholder="리뷰를 입력하세요."
        value={updateReviewContent}
        onChange={handleChangeContent}
      />
      <div className="menu-review-edit-button">
        <ButtonNormal
          text="저장"
          bgColor="#D3FFC3"
          handleClick={handleSubmitUpdate}
        />
        <ButtonNormal text="취소" handleClick={handleCloseWindow} />
      </div>
    </div>
  );
}

export default MenuReviewEdit;
