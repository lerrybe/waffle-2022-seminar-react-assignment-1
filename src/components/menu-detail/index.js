import "./menu-detail.css";

import closeIcon from "../../assets/close-icon.svg";
import updateIcon from "../../assets/update-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";

const MenuDetail = () => {
  return (
    <div className="menu-detail-wrapper">
      <img className="close-icon" alt="close" src={closeIcon} />
      <div className="menu-detail-content-wrapper">
        <img
          className="detail-img"
          alt="detail_img"
          src="https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg"
        />
        <span className="detail-name">블루베리 스무디</span>
        <span className="detail-price">5,000원</span>
        <div className="method-wrapper">
          <img className="update-icon" alt="update" src={updateIcon} />
          <img className="delete-icon" alt="delete" src={deleteIcon} />
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
