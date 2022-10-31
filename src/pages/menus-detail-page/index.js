import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './menus-detail-page.css';

import Gnb from '../../components/gnb';
import MenuDetail from '../../components/menu-detail';
import MenuReviews from '../../components/menu-reviews';

import { requestMenu } from '../../api/menus';
import { useMenuDataActionsContext } from '../../context/MenuDataContext';

function MenusDetailPage() {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const { dispatchSelectedMenu } = useMenuDataActionsContext();

  useEffect(() => {
    (async () => {
      try {
        const res = await requestMenu(menuId);
        dispatchSelectedMenu(res.data);
      } catch (err) {
        console.log(err);
        navigate(-1);
      }
    })();
  }, []);

  return (
    <>
      <Gnb />
      <div className="menu-detail-wrapper">
        <MenuDetail />
        <MenuReviews />
      </div>
    </>
  );
}

export default MenusDetailPage;
