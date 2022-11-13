import React, { useEffect, useState } from 'react';

import Gnb from '../../components/gnb';
import MenuDetail from '../../components/menu-detail';
import MenuReviews from '../../components/menu-reviews';

import { ContentWrapper } from './menus-detail-page.styled';

import { Owner } from '../../types/auth';
import { loadObjItem } from '../../services/storage';

const MenusDetailPage: React.FC = () => {
  const [store, setStore] = useState<Owner | null>(null);

  useEffect(() => {
    const storeData = loadObjItem('owner');
    setStore(storeData);
  }, []);

  return (
    <>
      <Gnb
        storeSelected
        storeName={store?.store_name}
        username={store?.username}
      />
      <ContentWrapper>
        <MenuDetail />
        <MenuReviews />
      </ContentWrapper>
    </>
  );
};

export default MenusDetailPage;
