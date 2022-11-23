import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../loading';
import SearchBar from '../search-bar';
import StoreCard from '../store-card';
import { InnerWrapper, Wrapper } from './store-list.styled';

import { requestOwners } from '../../api/owners';

import {
  useStoreDataContext,
  useStoreDataActionsContext,
} from '../../context/StoreDataContext';

const StoreList: React.FC = () => {
  const navigate = useNavigate();
  const { stores } = useStoreDataContext()!;
  const [storeList, setStoreList] = useState(stores);
  const { dispatchStores } = useStoreDataActionsContext()!;

  // 💡 DESC: 초기 stores fetching
  useEffect(() => {
    (async () => {
      const res = await requestOwners();
      dispatchStores(res);
      setStoreList(res);
    })();
  }, []);

  // DESC: 스토어 검색 함수
  const searchStores = useCallback((keyword: string | null) => {
    if (keyword?.trim()) {
      (async () => {
        const res = await requestOwners(keyword);
        dispatchStores(res);
        setStoreList(res);
      })();
    } else {
      (async () => {
        const res = await requestOwners();
        dispatchStores(res);
        setStoreList(res);
      })();
    }
  }, []);

  const handleClickStore = useCallback((storeId: number) => {
    navigate(`/stores/${storeId}`);
  }, []);

  return (
    <Wrapper>
      <SearchBar label="가게 검색: " search={searchStores} />
      <>
        {!storeList ? (
          <Loading />
        ) : (
          <InnerWrapper>
            {storeList?.map((el) => (
              <StoreCard
                key={el?.id}
                storeName={el?.store_name || '🧇'}
                username={el?.username || '-'}
                storeDesc={el?.store_description || '👥'}
                rating={el?.rating || 0}
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
