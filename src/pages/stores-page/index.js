import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './stores-page.css';

import Gnb from '../../components/gnb';
import MenuListContainer from '../../components/menu-list-container';

import { requestOwner } from '../../api/owners';
import { useStoreDataActionsContext } from '../../context/StoreDataContext';
import { useMenuDataActionsContext } from '../../context/MenuDataContext';

import { saveObjItem } from '../../services/storage';

function StoresPage() {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const { dispatchSelectedMenu } = useMenuDataActionsContext();
  const { dispatchSelectedStore } = useStoreDataActionsContext();

  // 💡 DESC: store 선택에 따른 data fetching
  useEffect(() => {
    dispatchSelectedMenu(null);
    (async () => {
      try {
        const res = await requestOwner(storeId);
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
        storeName={store?.owner?.store_name}
        username={store?.owner?.username}
      />
      <div className="page-content-wrapper">
        <MenuListContainer />
      </div>
    </>
  );
}

export default StoresPage;
