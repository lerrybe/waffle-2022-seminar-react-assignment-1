import { forwardRef } from 'react';

import './menu-review.css';
import { Rating } from '@mui/material';
import updateIcon from '../../assets/update-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';

import { loadObjItem } from '../../services/storage';

// DESC: 무한 스크롤을 위한 마지막 div props를 위한 forwardRef
const MenuReview = forwardRef(
  (
    {
      reviewId,
      author,
      content,
      rating,
      createdAt,
      handleToggleDeleteModal,
      handleOpenUpdateWindow,
    },
    ref,
  ) => {
    const user = loadObjItem('user');

    return (
      <div className="menu-review-wrapper" ref={ref}>
        <div className="menu-review-header">
          <span className="menu-review-username">{author?.username}</span>
          <Rating
            name="half-rating-read"
            value={Number((Number(rating) / 2).toFixed(1))}
            precision={0.5}
            readOnly
            size="small"
          />
          <span className="menu-review-time">{createdAt}</span>
          {/* DESC: 작성자만 수정/삭제 가능 */}
          {user?.username === author?.username && (
            <div className="menu-review-action">
              <button
                className="menu-review-update"
                onClick={() => handleOpenUpdateWindow(reviewId)}
              >
                <img alt="update" src={updateIcon} />
              </button>
              <button onClick={() => handleToggleDeleteModal(reviewId)}>
                <img alt="delete" src={deleteIcon} />
              </button>
            </div>
          )}
        </div>
        <div className="menu-review-content">{content}</div>
      </div>
    );
  },
);

export default MenuReview;
