import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './store-list.css';

import Loading from '../loading';
import SearchBar from '../search-bar';
import StoreCard from '../store-card';

import { requestOwners } from '../../api/owners';

function StoreList() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [storeList, setStoreList] = useState(null);

  // 💡 DESC: 초기 stores fetching
  useEffect(() => {
    (async () => {
      const stores = await requestOwners(keyword);
      setStoreList(stores);
    })();
  }, [keyword, requestOwners]);

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
