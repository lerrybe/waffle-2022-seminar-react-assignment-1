import { useNavigate } from 'react-router-dom';

// import styles
import {
  Wrapper,
  CloseIcon,
  ContentWrapper,
  OverviewMenuName,
  OverviewMenuPrice,
  OverviewMenuRating,
  OverviewMenuType,
  ThumbnailImg,
  ThumbnailReplaceImg,
} from './menu-overview.styled';
import closeIcon from '../../assets/close-icon.svg';

// import components
import { Rating } from '@mui/material';
import ButtonNormal from '../button-normal';

// import utils and type
import { convertTypeEnToKo } from '../../utils/menu/type';
import { toStringNumberWithComma } from '../../utils/menu/price';

// import context
import { useMenuDataContext } from '../../context/MenuDataContext';

interface MenuOverview {
  handleCloseOverview: () => void;
}

const MenuOverview: React.FC<MenuOverview> = ({
  handleCloseOverview,
}: MenuOverview) => {
  const navigate = useNavigate();
  const { selectedMenu } = useMenuDataContext()!;

  return (
    <Wrapper>
      <CloseIcon alt="close" src={closeIcon} onClick={handleCloseOverview} />
      <ContentWrapper>
        {selectedMenu?.image ? (
          <ThumbnailImg
            alt="대표 이미지가 없습니다."
            src={selectedMenu?.image}
          />
        ) : (
          <ThumbnailReplaceImg>대표 이미지가 없습니다.</ThumbnailReplaceImg>
        )}
        {selectedMenu && (
          <>
            <OverviewMenuName>{selectedMenu?.name}</OverviewMenuName>
            <OverviewMenuType>
              {convertTypeEnToKo(selectedMenu?.type)}
            </OverviewMenuType>
            <OverviewMenuPrice>
              {toStringNumberWithComma(String(selectedMenu?.price))}원
            </OverviewMenuPrice>
            <OverviewMenuRating>
              <Rating
                name="half-rating-read"
                value={
                  selectedMenu?.rating
                    ? Number((selectedMenu.rating / 2).toFixed(1))
                    : 0
                }
                precision={0.5}
                size="large"
                readOnly
              />
            </OverviewMenuRating>
          </>
        )}

        <ButtonNormal
          text="자세히"
          handleClick={() => navigate(`/menus/${selectedMenu?.id}`)}
        />
      </ContentWrapper>
    </Wrapper>
  );
};

export default MenuOverview;
