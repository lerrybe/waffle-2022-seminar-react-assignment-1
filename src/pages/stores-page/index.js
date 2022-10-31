import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './stores-page.css';

import Gnb from '../../components/gnb';
import MenuListContainer from '../../components/menu-list-container';

import { requestOwner } from '../../api/owners';

function StoresPage() {
  const { storeId } = useParams();
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeSelected, setStoreSelected] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const store = await requestOwner(storeId);
        setSelectedStore(store);
        setStoreSelected(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <Gnb
        storeSelected={storeSelected}
        storeName={selectedStore?.owner?.store_name}
        username={selectedStore?.owner?.username}
      />
      <div className="page-content-wrapper">
        <MenuListContainer />
      </div>
    </>
  );
}

export default StoresPage;
