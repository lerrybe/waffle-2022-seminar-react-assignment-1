import "./menu-detail.css";
import { numberToCommaString } from "../../utils/numberToCommaString";
import closeIcon from "../../assets/close-icon.svg";
import updateIcon from "../../assets/update-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";

const MenuDetail = ({
  handleCloseDetail,
  handleToggleUpdateModal,
  handleToggleDeleteModal,
  selectedMenu,
}) => {
  return (
    <div className="menu-detail-wrapper">
      <img
        className="close-icon"
        alt="close"
        src={closeIcon}
        onClick={handleCloseDetail}
      />
      <div className="menu-detail-content-wrapper">
        {selectedMenu && selectedMenu.image ? (
          <img
            className="detail-img"
            alt="detail_img"
            src={selectedMenu.image}
          />
        ) : (
          <div className="detail-img">{"대표 이미지가 없습니다."}</div>
        )}
        {selectedMenu && (
          <>
            <span className="detail-name">{selectedMenu.name}</span>
            <span className="detail-price">
              {numberToCommaString(selectedMenu.price)}원
            </span>
          </>
        )}

        <div className="method-wrapper">
          <img
            className="update-icon"
            alt="update"
            src={updateIcon}
            onClick={handleToggleUpdateModal}
          />
          <img
            className="delete-icon"
            alt="delete"
            src={deleteIcon}
            onClick={handleToggleDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
