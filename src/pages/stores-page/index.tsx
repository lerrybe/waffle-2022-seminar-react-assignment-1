import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ContentWrapper } from './stores-page.styled';

import Gnb from '../../components/gnb';
import MenuListContainer from '../../components/menu-list-container';

import { requestOwner } from '../../api/owners';
import { useStoreDataActionsContext } from '../../context/StoreDataContext';
import { useMenuDataActionsContext } from '../../context/MenuDataContext';

import { Owner } from '../../types/auth';

import { saveObjItem } from '../../services/storage';

const StoresPage: React.FC = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState<Owner | null>(null);
  const { dispatchSelectedMenu } = useMenuDataActionsContext()!;
  const { dispatchSelectedStore } = useStoreDataActionsContext()!;

  // 💡 DESC: store 선택에 따른 data fetching
  useEffect(() => {
    dispatchSelectedMenu(null);
    (async () => {
      try {
        const res = await requestOwner(
          Number(storeId) === NaN ? null : Number(storeId),
        );
        setStore(res);
        dispatchSelectedStore(res);
        saveObjItem('owner', res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <Gnb
        storeSelected
        storeName={store?.store_name}
        username={store?.username}
      />
      <ContentWrapper>
        <MenuListContainer />
      </ContentWrapper>
    </>
  );
};

export default StoresPage;
