import { forwardRef } from 'react';
import Moment from 'react-moment';

// import components
import { Rating } from '@mui/material';

// import styles
import {
  Icon,
  Button,
  Header,
  Wrapper,
  Content,
  Username,
  CreatedAtTime,
  ButtonWrapper,
} from './menu-review.styled';
import updateIcon from '../../assets/update-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';

// import types
import { Owner } from '../../types/auth';

// import util functions
import { loadObjItem } from '../../services/storage';

// import contexts
import { useSessionContext } from '../../context/SessionContext';

interface MenuReview {
  reviewId: number;
  author: Owner;
  content: string;
  rating: number;
  createdAt: Date;
  handleOpenUpdateWindow: (id: number) => void;
  handleToggleDeleteModal: (id: number) => void;
}

// DESC: 무한 스크롤을 위한 마지막 div props를 위한 forwardRef
const MenuReview = forwardRef<HTMLDivElement | null, MenuReview>(
  (
    {
      reviewId,
      author,
      content,
      rating,
      createdAt,
      handleOpenUpdateWindow,
      handleToggleDeleteModal,
    },
    ref,
  ) => {
    const user: Owner | null = loadObjItem('user');
    const { accessToken } = useSessionContext()!;

    return (
      <Wrapper ref={ref}>
        <Header>
          <Username>{author?.username}</Username>
          <Rating
            size="small"
            readOnly
            precision={0.5}
            name="half-rating-read"
            value={Number((rating / 2).toFixed(1))}
          />
          <CreatedAtTime>
            <Moment fromNow ago>
              {createdAt}
            </Moment>
            {' ago'}
          </CreatedAtTime>

          {/* DESC: 작성자만 수정/삭제 가능 */}

          {user?.username === author?.username && accessToken && (
            <ButtonWrapper>
              <Button onClick={() => handleOpenUpdateWindow(reviewId)}>
                <Icon alt="update" src={updateIcon} />
              </Button>
              <Button onClick={() => handleToggleDeleteModal(reviewId)}>
                <Icon alt="delete" src={deleteIcon} />
              </Button>
            </ButtonWrapper>
          )}
        </Header>
        <Content>{content}</Content>
      </Wrapper>
    );
  },
);

export default MenuReview;
