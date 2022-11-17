import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import _ from 'lodash';

import Loading from '../loading';
import SearchBar from '../search-bar';
import StoreCard from '../store-card';
import { InnerWrapper, Wrapper } from './store-list.styled';

import { requestOwners, requestSearchedOwners } from '../../api/owners';

import {
  useStoreDataContext,
  useStoreDataActionsContext,
} from '../../context/StoreDataContext';

const StoreList: React.FC = () => {
  const navigate = useNavigate();

  const { stores } = useStoreDataContext()!;

  const [keyword, setKeyword] = useState<string>();
  const [storeList, setStoreList] = useState(stores);

  const { dispatchStores } = useStoreDataActionsContext()!;

  // 💡 DESC: 초기 stores fetching
  useEffect(() => {
    if (!keyword) {
      (async () => {
        const res = await requestOwners();
        dispatchStores(res);
        setStoreList(res);
      })();
    } else {
      (async () => {
        const res = await requestSearchedOwners(keyword);
        dispatchStores(res);
        setStoreList(res);
      })();
    }
  }, [keyword]);

  // TODO: throttle
  // DESC: 검색어 변화 감지 이벤트 핸들러 함수
  // const handleChangeKeyword = _.throttle((e) => {
  //   setKeyword(e.target.value);
  // }, 500);

  const handleChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.currentTarget.value);
    },
    [],
  );

  const handleClickStore = useCallback((storeId: number) => {
    navigate(`/stores/${storeId}`);
  }, []);

  // 💡 DESC: 가게의 rating 정보, 현재는 난수 생성 * TODO: API Fetching
  const randomStarRating = () => Math.floor(Math.random() * 10) + 1;

  return (
    <Wrapper>
      <SearchBar
        keyword={keyword}
        label="가게 검색: "
        handleChangeKeyword={handleChangeKeyword}
      />
      <>
        {!storeList ? (
          <Loading />
        ) : (
          <InnerWrapper>
            {storeList?.map((el) => (
              <StoreCard
                key={el?.id}
                storeName={el?.store_name || '-'}
                username={el?.username || '-'}
                storeDesc={el?.store_description || '-'}
                rating={randomStarRating()}
                handleClick={() => handleClickStore(el?.id)}
              />
            ))}
          </InnerWrapper>
        )}
      </>
    </Wrapper>
  );
};

export default StoreList;
