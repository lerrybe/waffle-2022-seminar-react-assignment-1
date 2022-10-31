import './menu-review-edit.css';

import ButtonNormal from '../button-normal';

function MenuReviewEdit() {
  return (
    <div className="menu-review-edit-wrapper">
      <span className="menu-review-edit-rating">{'☆'.repeat(5)}</span>
      <textarea className="menu-review-edit-textarea" placeholder="리뷰를 입력하세요.">
        원래 있던 내용
      </textarea>
      <div className="menu-review-edit-button">
        <ButtonNormal text="저장" bgColor="#D3FFC3" />
        <ButtonNormal text="취소" />
      </div>
    </div>
  );
}

export default MenuReviewEdit;
