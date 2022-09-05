import { useEffect, useState } from "react";
import "./menu-detail.css";
import { numberToCommaString } from "../../utils/numberToCommaString";
import closeIcon from "../../assets/close-icon.svg";
import updateIcon from "../../assets/update-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";

const MenuDetail = ({ menuItems, handleCloseDetail, selectedMenu }) => {
  const [items] = useState(menuItems);
  const [targetItem, setTargetItem] = useState(null);

  // items에서 selectedMenu와 이름 같은 친구 찾아서 targetItem으로 설정해줌
  const handleFindSelectedMenu = () => {
    items.map((item) => (item === selectedMenu ? setTargetItem(item) : null));
  };

  useEffect(() => {
    handleFindSelectedMenu();
  }, [selectedMenu]);

  return (
    <div className="menu-detail-wrapper">
      <img
        className="close-icon"
        alt="close"
        src={closeIcon}
        onClick={handleCloseDetail}
      />
      <div className="menu-detail-content-wrapper">
        {targetItem && targetItem.image ? (
          <img className="detail-img" alt="detail_img" src={targetItem.image} />
        ) : (
          <div className="detail-img">{"대표 이미지가 없습니다."}</div>
        )}
        <span className="detail-name">{targetItem && targetItem.name}</span>
        <span className="detail-price">
          {targetItem && numberToCommaString(targetItem.price)}원
        </span>
        <div className="method-wrapper">
          <img className="update-icon" alt="update" src={updateIcon} />
          <img className="delete-icon" alt="delete" src={deleteIcon} />
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
