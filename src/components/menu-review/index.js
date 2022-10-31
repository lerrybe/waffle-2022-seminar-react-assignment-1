import { useState } from 'react';

import './menu-review.css';
import updateIcon from '../../assets/update-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';

function MenuReview() {
  const [isWriter] = useState(true);
  return (
    <div className="menu-review-wrapper">
      <div className="menu-review-header">
        <span className="menu-review-username">lerrybe</span>
        <span className="menu-review-rating">{'★'.repeat(3) + '☆'.repeat(5 - 3)}</span>
        <span className="menu-review-time">2 hours ago</span>
        {isWriter && (
          <div className="menu-review-action">
            <button className="menu-review-update" onClick={() => console.log('update')}>
              <img alt="update" src={updateIcon} />
            </button>
            <button onClick={() => console.log('delete')}>
              <img alt="delete" src={deleteIcon} />
            </button>
          </div>
        )}
      </div>
      <div className="menu-review-content">
        명절용 와플이 따로 있는 게 아니다. 그저 잘 만든 와플과 그렇지 못한 와플이 있을 뿐.
      </div>
    </div>
  );
}

export default MenuReview;
