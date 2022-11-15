import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import _ from 'lodash';

import './store-list.css';

import Loading from '../loading';
import SearchBar from '../search-bar';
import StoreCard from '../store-card';

import { requestOwners, requestSearchedOwners } from '../../api/owners';

import {
  useStoreDataContext,
  useStoreDataActionsContext,
} from '../../context/StoreDataContext';

function StoreList() {
  const navigate = useNavigate();

  const { stores } = useStoreDataContext();

  const [keyword, setKeyword] = useState('');
  const [storeList, setStoreList] = useState(stores);

  const { dispatchStores } = useStoreDataActionsContext();

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

  // DESC: 검색어 변화 감지 이벤트 핸들러 함수
  // const handleChangeKeyword = _.throttle((e) => {
  //   setKeyword(e.target.value);
  // }, 500);

  const handleChangeKeyword = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  const handleClickStore = useCallback((storeId) => {
    navigate(`/stores/${storeId}`);
  }, []);

  // 💡 DESC: 가게의 rating 정보, 현재는 난수 생성 * TODO: API Fetching
  const randomStarRating = () => Math.floor(Math.random() * 10) + 1;

  return (
    <div className="store-outer-wrapper">
      <SearchBar
        keyword={keyword}
        label="가게 검색: "
        handleChangeKeyword={handleChangeKeyword}
      />
      <>
        {!storeList ? (
          <Loading />
        ) : (
          <div className="store-content-wrapper">
            {storeList?.map((el) => (
              <StoreCard
                key={el?.id}
                storeName={el?.store_name || '이름 없는 가게'}
                username={el?.username || '주인 없는 가게'}
                storeDesc={el?.store_description || '설명이 없는 가게'}
                rating={randomStarRating()}
                handleClick={() => handleClickStore(el?.id)}
              />
            ))}
          </div>
        )}
      </>
    </div>
  );
}

export default StoreList;
