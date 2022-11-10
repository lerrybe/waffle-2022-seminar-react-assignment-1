import { useNavigate } from 'react-router-dom';

import './menu-overview.css';
import { Rating } from '@mui/material';
import closeIcon from '../../assets/close-icon.svg';

import ButtonNormal from '../button-normal';

import { convertTypeEnToKo } from '../../utils/menu/type';
import { toStringNumberWithComma } from '../../utils/menu/price';

import { useMenuDataContext } from '../../context/MenuDataContext';

function MenuOverview({ handleCloseOverview }) {
  const navigate = useNavigate();
  const { selectedMenu } = useMenuDataContext();

  return (
    <div className="menu-overview-wrapper">
      <img
        className="close-icon"
        alt="close"
        src={closeIcon}
        onClick={handleCloseOverview}
      />
      <div className="menu-overview-content-wrapper">
        {selectedMenu?.image ? (
          <img
            className="overview-img"
            alt="대표 이미지가 없습니다."
            src={selectedMenu?.image}
          />
        ) : (
          <div className="overview-img">대표 이미지가 없습니다.</div>
        )}
        {selectedMenu && (
          <>
            <span className="overview-name">{selectedMenu?.name}</span>
            <span className="overview-type">
              {convertTypeEnToKo(selectedMenu?.type)}
            </span>
            <span className="overview-price">
              {toStringNumberWithComma(selectedMenu?.price)}원
            </span>
            <span className="overview-rating">
              <Rating
                name="half-rating-read"
                value={
                  selectedMenu?.rating
                    ? (Number(selectedMenu.rating) / 2).toFixed(1)
                    : 0
                }
                precision={0.5}
                size="large"
                readOnly
              />
            </span>
          </>
        )}

        <ButtonNormal
          text="자세히"
          handleClick={() => navigate(`/menus/${selectedMenu?.id}`)}
        />
      </div>
    </div>
  );
}

export default MenuOverview;
