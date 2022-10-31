import './menu-review-create.css';

import ButtonNormal from '../button-normal';

function MenuReviewCreate() {
  return (
    <div className="menu-review-create-wrapper">
      <span className="menu-review-create-rating">{'☆'.repeat(5)}</span>
      <textarea className="menu-review-create-textarea" placeholder="리뷰를 입력하세요." />
      <div className="menu-review-create-button">
        <ButtonNormal text="저장" bgColor="#D3FFC3" />
      </div>
    </div>
  );
}

export default MenuReviewCreate;
