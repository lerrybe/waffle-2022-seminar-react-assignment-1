import './menu-reviews.css';

import MenuReview from '../menu-review';
import MenuReviewEdit from '../menu-review-edit';
import MenuReviewCreate from '../menu-review-create';

function MenuReviews() {
  return (
    <div className="menu-reviews-wrapper">
      <div className="menu-review-rating-wrapper">
        <span className="menu-reviews-rating-title">평균 별점</span>
        <span className="menu-reviews-rating">{'★'.repeat(3) + '☆'.repeat(5 - 3)}</span>
        <span className="menu-reviews-rating-text">3.50</span>
      </div>
      <MenuReview />
      <MenuReviewEdit />
      <MenuReviewCreate />
    </div>
  );
}

export default MenuReviews;
