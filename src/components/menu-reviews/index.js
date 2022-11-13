import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import './menu-reviews.css';
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';

import MenuReview from '../menu-review';
import ModalDelete from '../modal-delete';
import MenuReviewEdit from '../menu-review-edit';
import MenuReviewNew from '../menu-review-new';

import {
  requestCreateReview,
  requestDeleteReview,
  requestReview,
  requestReviews,
  requestUpdateReview,
} from '../../api/reviews';

import { clearItem } from '../../services/storage';
import { useSessionContext } from '../../context/SessionContext';

function MenuReviews() {
  // DESC: 무한 스크롤을 위한 마지막 요소 ref 지정
  const [ref, inView] = useInView();
  const { menuId } = useParams();
  const { accessToken } = useSessionContext();

  const [next, setNext] = useState('');
  const [reviews, setReviews] = useState();
  const [reviewId, setReviewId] = useState();
  const [menuRating, setMenuRating] = useState(0);

  // DESC: 리뷰 생성, 리뷰 수정을 위한 states
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [updateReviewRating, setUpdateReviewRating] = useState(0);
  const [updateReviewContent, setUpdateReviewContent] = useState('');

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);

  const [closeUpdateWindow, setCloseUpdateWindow] = useState(true);
  const [targetReviewForUpdate, setTargetReviewForUpdate] = useState(null);

  // 💡 DESC: 리뷰 수정 윈도우창 닫힐 때 초기화
  useEffect(() => {
    if (reviewId && !closeUpdateWindow) {
      (async () => {
        const res = await requestReview(Number(reviewId));
        setUpdateReviewContent(res?.content);
        setUpdateReviewRating(Number(res?.rating));
      })();
    }
  }, [requestReview, reviewId]);

  // 💡 DESC: 리뷰 수정하는 윈도우창 관련 함수
  const handleOpenUpdateWindow = useCallback((reviewId) => {
    setReviewId(reviewId);
    setTargetReviewForUpdate(reviewId);
    setCloseUpdateWindow(false);
  }, []);

  const handleCloseWindow = useCallback(() => {
    setCloseUpdateWindow(true);
    (async () => {
      const res = await requestReview(Number(reviewId));
      setUpdateReviewContent(res?.content);
      setUpdateReviewRating(Number(res?.rating));
    })();
  }, [reviewId]);

  // 💡 DESC: 리뷰 삭제 관련 모달 토글 함수
  const handleToggleDeleteModal = useCallback(
    (id) => {
      setModalAnimation((prev) => !prev);
      setReviewId(id);

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
  const handleChangeRating = useCallback((e) => {
    setNewReviewRating(e.target.value);
  }, []);

  const handleChangeContent = useCallback((e) => {
    setNewReviewContent(e.target.value);
  }, []);

  const handleChangeUpdateRating = useCallback((e) => {
    setUpdateReviewRating(e.target.value);
  }, []);

  const handleChangeUpdateContent = useCallback((e) => {
    setUpdateReviewContent(e.target.value);
  }, []);

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
      rating: Number(newReviewRating) * 2,
      menu: Number(menuId),
    };
    (async () => {
      const res = await requestCreateReview(data, accessToken);
      if (res) {
        const res = await requestReviews(menuId, '', 6);
        setReviews(res.data);
        setNext(res?.next);
        setNewReviewContent('');
        setNewReviewRating(0);
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
      rating: Number(updateReviewRating) * 2,
    };
    (async () => {
      const res = await requestUpdateReview(reviewId, data, accessToken);
      if (res) {
        const res = await requestReviews(menuId, '', 6);
        setReviews(res.data);
        setNext(res?.next);
        setCloseUpdateWindow(true);
      }
    })();
  }, [updateReviewContent, updateReviewRating]);

  // 💡 DESC: 리뷰 삭제 이벤트 핸들러 함수
  const handleDeleteReview = useCallback(
    (reviewId, accessToken) => {
      (async () => {
        await requestDeleteReview(reviewId, accessToken);

        const res = await requestReviews(menuId, '', 6);
        setReviews(res.data);
        setNext(res?.next);
      })();

      handleToggleDeleteModal();
      clearItem('reviewId');
    },
    [reviewId],
  );

  // 💡 DESC: 초기로딩 시 reviews fetch
  useEffect(() => {
    (async () => {
      // initial request
      const res = await requestReviews(menuId, '', 6);
      setReviews(res.data);
      setNext(res?.next);

      if (res?.data.length !== 0) {
        setMenuRating(res.data[0]?.menu?.rating);
      }
    })();
  }, []);

  // 💡 DESC: 마지막 div view 감지 시 추가 리뷰들 fetch
  useEffect(() => {
    (async () => {
      if (inView) {
        const res = await requestReviews(menuId, next, 6);
        setReviews((prevReviews) => [...prevReviews, ...res.data]);
        setNext(res?.next);
      }
    })();
  }, [setNext, inView]);

  return (
    <div className="menu-reviews-wrapper">
      <div className="menu-review-rating-wrapper">
        <span className="menu-reviews-rating-title">평균 별점</span>
        <Rating
          name="half-rating-read"
          value={Number((Number(menuRating) / 2).toFixed(1))}
          precision={0.5}
          readOnly
        />
        <span className="menu-reviews-rating-text">
          {(Number(menuRating) / 2).toFixed(1)}
        </span>
      </div>
      <div className="menu-reviews-content-wrapper">
        <ul>
          {reviews?.map((review, idx) =>
            targetReviewForUpdate === review?.id && !closeUpdateWindow ? (
              <MenuReviewEdit
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
                rating={Number(review?.rating)}
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
                rating={Number(review?.rating)}
                createdAt={review?.created_at}
                handleOpenUpdateWindow={handleOpenUpdateWindow}
                handleToggleDeleteModal={handleToggleDeleteModal}
              />
            ),
          )}
        </ul>
      </div>
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
          handleDelete={() => handleDeleteReview(reviewId, accessToken)}
          handleToggleDeleteModal={handleToggleDeleteModal}
        />
      )}
    </div>
  );
}

export default MenuReviews;
