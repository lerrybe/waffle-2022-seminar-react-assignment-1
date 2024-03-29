import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';

// import useInView for infinity scroll
import { useInView } from 'react-intersection-observer';

// import styles
import {
  Wrapper,
  UlWrapper,
  RatingText,
  RatingTitle,
  RatingWrapper,
  ReviewContentWrapper,
} from './menu-reviews.styled';

// import components
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import MenuReview from '../menu-review';
import ModalDelete from '../modal-delete';
import MenuReviewNew from '../menu-review-new';
import MenuReviewEdit from '../menu-review-edit';

// import types
import { Review } from '../../types/reviews';

// import utils of API functions
import {
  requestReview,
  requestReviews,
  requestUpdateReview,
  requestCreateReview,
  requestDeleteReview,
} from '../../api/reviews';
import { clearItem } from '../../services/storage';

// import contexts
import {
  useSessionContext,
  useSessionActionsContext,
} from '../../context/SessionContext';

const MenuReviews: React.FC = () => {
  // DESC: 무한 스크롤을 위한 마지막 요소 ref 지정
  const { menuId } = useParams();
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const { accessToken } = useSessionContext()!;
  const { refresh } = useSessionActionsContext()!;

  const [next, setNext] = useState('');
  const [currMenuId] = useState<number | null>(
    Number(menuId) === NaN ? null : Number(menuId),
  );
  const [menuRating, setMenuRating] = useState(0);
  const [reviews, setReviews] = useState<Review[] | null>();
  const [reviewId, setReviewId] = useState<number | undefined>();

  // DESC: 리뷰 생성, 리뷰 수정을 위한 states
  const [newReviewRating, setNewReviewRating] = useState<number>(0);
  const [newReviewContent, setNewReviewContent] = useState<string>('');
  const [updateReviewRating, setUpdateReviewRating] = useState<number>(0);
  const [updateReviewContent, setUpdateReviewContent] = useState<string>('');

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);

  const [closeUpdateWindow, setCloseUpdateWindow] = useState(true);
  const [targetReviewForUpdate, setTargetReviewForUpdate] = useState<
    number | null
  >(null);

  // 💡 DESC: 리뷰 수정 윈도우창 닫힐 때 초기화
  useEffect(() => {
    if (reviewId && !closeUpdateWindow) {
      (async () => {
        const res: Review = await requestReview(reviewId);
        setUpdateReviewContent(res?.content);
        setUpdateReviewRating(res?.rating / 2);
      })();
    }
  }, [requestReview, reviewId]);

  // 💡 DESC: 리뷰 수정하는 윈도우창 관련 함수
  const handleOpenUpdateWindow = useCallback((reviewId: number) => {
    setReviewId(reviewId);
    setTargetReviewForUpdate(reviewId);
    setCloseUpdateWindow(false);
  }, []);

  const handleCloseWindow = useCallback(() => {
    setCloseUpdateWindow(true);
    (async () => {
      const res: Review = await requestReview(reviewId);
      setUpdateReviewContent(res?.content);
      setUpdateReviewRating(res?.rating / 2);
    })();
  }, [reviewId]);

  // 💡 DESC: 리뷰 삭제 관련 모달 토글 함수
  const handleToggleDeleteModal = useCallback(
    (reviewId?: number) => {
      setReviewId(reviewId);
      setModalAnimation((prev) => !prev);

      if (modalAnimation) {
        // DESC: 모달 unmount시 애니메이션 적용을 위해 0.3초 delay 후 unmount
        setTimeout(() => {
          setIsModalOpened((prev) => !prev);
        }, 300);
      } else {
        setIsModalOpened((prev) => !prev);
      }
    },
    [modalAnimation],
  );

  // 💡 DESC: 리뷰 생성 및 수정 이벤트 감지 함수
  const handleChangeRating = useCallback(
    (e: React.SyntheticEvent<Element, Event>) => {
      const target = e.target as HTMLInputElement;
      // DESC: target.value: string -> type casting needed
      setNewReviewRating(Number(target.value));
    },
    [],
  );

  const handleChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewReviewContent(e.target.value);
    },
    [],
  );

  const handleChangeUpdateRating = useCallback(
    (e: React.SyntheticEvent<Element, Event>) => {
      const target = e.target as HTMLInputElement;
      // DESC: target.value: string -> type casting needed
      setUpdateReviewRating(Number(target.value));
    },
    [],
  );

  const handleChangeUpdateContent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUpdateReviewContent(e.target.value);
    },
    [],
  );

  // 💡 DESC: submit 함수 (리뷰 생성, 리뷰 수정)
  const handleSubmitCreate = useCallback(() => {
    if (!accessToken) {
      toast.warn('로그인 후 리뷰 작성 가능합니다.');
      return;
    }
    if (!newReviewContent || !newReviewRating) {
      toast.warn('별점과 내용을 입력해주세요.');
      return;
    }
    const data = {
      content: newReviewContent,
      rating: newReviewRating * 2,
      menu: currMenuId,
    };
    (async () => {
      const res = await requestCreateReview(data, accessToken);
      if (res && res !== 401) {
        const res = await requestReviews(currMenuId, null, 6);
        setReviews(res?.data);
        setNext(res?.next);
        setNewReviewContent('');
        setNewReviewRating(0);
        if (res?.data.length !== 0) {
          setMenuRating(res?.data[0]?.menu?.rating);
        }
      }

      if (res === 401) {
        // 🌟 DESC: accessToken 갱신 후 요청 재시도
        refresh();

        const res = await requestCreateReview(data, accessToken);
        if (res && res !== 401) {
          const res = await requestReviews(currMenuId, null, 6);
          setReviews(res?.data);
          setNext(res?.next);
          setNewReviewContent('');
          setNewReviewRating(0);
          if (res?.data.length !== 0) {
            setMenuRating(res?.data[0]?.menu?.rating);
          }
        }

        if (res === 401) {
          toast.error('사용자 인증이 필요합니다.');
          navigate('/login');
        }
      }
    })();
  }, [newReviewContent, newReviewRating]);

  const handleSubmitUpdate = useCallback(() => {
    if (!accessToken) {
      toast.warn('로그인 후 리뷰 작성 가능합니다.');
      return;
    }
    if (!updateReviewContent || !updateReviewRating) {
      toast.warn('별점과 내용을 입력해주세요.');
      return;
    }
    const data = {
      content: updateReviewContent,
      rating: updateReviewRating * 2,
    };
    (async () => {
      const res = await requestUpdateReview(
        Number(reviewId) === NaN ? null : Number(reviewId),
        data,
        accessToken ? accessToken : null,
      );
      if (res && res != 401) {
        const res = await requestReviews(currMenuId, null, 6);
        setReviews(res?.data);
        setNext(res?.next);
        setCloseUpdateWindow(true);
        if (res?.data.length !== 0) {
          setMenuRating(res?.data[0]?.menu?.rating);
        }
      }

      if (res === 401) {
        // 🌟 DESC: accessToken 갱신 후 요청 재시도
        refresh();

        const res = await requestUpdateReview(
          Number(reviewId) === NaN ? null : Number(reviewId),
          data,
          accessToken ? accessToken : null,
        );
        if (res && res != 401) {
          const res = await requestReviews(currMenuId, null, 6);
          setReviews(res?.data);
          setNext(res?.next);
          setCloseUpdateWindow(true);
          if (res?.data.length !== 0) {
            setMenuRating(res?.data[0]?.menu?.rating);
          }
        }

        if (res === 401) {
          toast.error('사용자 인증이 필요합니다.');
          navigate('/login');
        }
      }
    })();
  }, [updateReviewContent, updateReviewRating]);

  // 💡 DESC: 리뷰 삭제 이벤트 핸들러 함수
  const handleDeleteReview = useCallback(() => {
    (async () => {
      await requestDeleteReview(
        Number(reviewId) === NaN ? null : Number(reviewId),
        accessToken ? accessToken : null,
      );

      const res = await requestReviews(currMenuId, null, 6);
      if (res && res != 401) {
        setReviews(res?.data);
        setNext(res?.next);
        if (res?.data.length !== 0) {
          setMenuRating(res?.data[0]?.menu?.rating);
        }
      }

      if (res === 401) {
        const res = await requestReviews(currMenuId, null, 6);
        if (res && res != 401) {
          setReviews(res?.data);
          setNext(res?.next);
          if (res?.data.length !== 0) {
            setMenuRating(res?.data[0]?.menu?.rating);
          }
        }

        if (res === 401) {
          toast.error('사용자 인증이 필요합니다.');
          navigate('/login');
        }
      }
    })();

    handleToggleDeleteModal();
    clearItem('reviewId');
  }, [reviewId]);

  // 💡 DESC: 초기로딩 시 reviews fetch
  useEffect(() => {
    (async () => {
      // initial request
      const res = await requestReviews(currMenuId, null, 6);
      setReviews(res?.data);
      setNext(res?.next);

      if (res?.data.length !== 0) {
        setMenuRating(res?.data[0]?.menu?.rating);
      }
    })();
  }, []);

  // 💡 DESC: 마지막 div view 감지 시 추가 리뷰들 fetch
  useEffect(() => {
    (async () => {
      if (inView) {
        const res = await requestReviews(currMenuId, next, 6);
        setReviews((prevReviews) => [...prevReviews!, ...res?.data]);
        setNext(res?.next);
      }
    })();
  }, [setNext, inView]);

  return (
    <Wrapper>
      <RatingWrapper>
        <RatingTitle>평균 별점</RatingTitle>
        <Rating
          readOnly
          precision={0.5}
          name="half-rating-read"
          // DESC: toFixed의 return type => string, typeCating needed
          value={Number((menuRating / 2).toFixed(1))}
        />
        <RatingText>{Number((menuRating / 2).toFixed(1))}</RatingText>
      </RatingWrapper>
      <ReviewContentWrapper>
        <UlWrapper>
          {reviews?.map((review, idx) =>
            targetReviewForUpdate === review?.id && !closeUpdateWindow ? (
              <MenuReviewEdit
                key={review.id}
                handleSubmitUpdate={handleSubmitUpdate}
                updateReviewRating={updateReviewRating}
                updateReviewContent={updateReviewContent}
                handleChangeRating={handleChangeUpdateRating}
                handleChangeContent={handleChangeUpdateContent}
                handleCloseWindow={handleCloseWindow}
              />
            ) : reviews.length - 1 === idx ? (
              <MenuReview
                ref={ref}
                key={review.id}
                reviewId={review?.id}
                author={review?.author}
                content={review?.content}
                rating={review?.rating}
                createdAt={review?.created_at}
                handleOpenUpdateWindow={handleOpenUpdateWindow}
                handleToggleDeleteModal={handleToggleDeleteModal}
              />
            ) : (
              <MenuReview
                key={review.id}
                reviewId={review?.id}
                author={review?.author}
                content={review?.content}
                rating={review?.rating}
                createdAt={review?.created_at}
                handleOpenUpdateWindow={handleOpenUpdateWindow}
                handleToggleDeleteModal={handleToggleDeleteModal}
              />
            ),
          )}
        </UlWrapper>
      </ReviewContentWrapper>
      <MenuReviewNew
        handleSubmitCreate={handleSubmitCreate}
        newReviewRating={newReviewRating}
        newReviewContent={newReviewContent}
        handleChangeRating={handleChangeRating}
        handleChangeContent={handleChangeContent}
      />
      {isModalOpened && (
        <ModalDelete
          title="리뷰 삭제"
          deleteModalToggle={modalAnimation}
          handleDelete={handleDeleteReview}
          handleToggleDeleteModal={handleToggleDeleteModal}
        />
      )}
    </Wrapper>
  );
};

export default MenuReviews;
