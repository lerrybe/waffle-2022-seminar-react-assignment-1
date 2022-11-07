import { useEffect, useState } from 'react';

import './menus-detail-page.css';

import Gnb from '../../components/gnb';
import MenuDetail from '../../components/menu-detail';
import MenuReviews from '../../components/menu-reviews';

import { loadObjItem } from '../../services/storage';

function MenusDetailPage() {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const storeData = loadObjItem('owner');
    setStore(storeData);
  }, []);

  return (
    <>
      <Gnb
        storeSelected
        storeName={store?.owner?.store_name}
        username={store?.owner?.username}
      />
      <div className="menu-detail-wrapper">
        <MenuDetail />
        <MenuReviews />
      </div>
    </>
  );
}

export default MenusDetailPage;
