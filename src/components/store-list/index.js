import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './store-list.css';

import Loading from '../loading';
import SearchBar from '../search-bar';
import StoreCard from '../store-card';

import { requestOwners } from '../../api/owners';

function StoreList() {
  // 각각의 카드에 onClick 이벤트!
  const navigate = useNavigate();
  const [storeList, setStoreList] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const stores = await requestOwners();
        setStoreList(stores);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleClickStore = useCallback((storeId) => {
    navigate(`/stores/${storeId}`);
  }, []);

  // TODO: 난수생성 -> API 정보로
  const randomStarRating = () => Math.floor(Math.random() * 5) + 1;

  return (
    <div className="store-outer-wrapper">
      <SearchBar label="가게 검색: " />
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
                starRating={randomStarRating()}
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
