import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './gnb.css';
import logoImg from '../../assets/logo.svg';

import ButtonNormal from '../button-normal';

import { useSessionContext, useSessionActionsContext } from '../../context/SessionContext';

// DESC: global navbar
function Gnb({ storeSelected, storeName, username }) {
  const navigate = useNavigate();
  const { logout } = useSessionActionsContext();
  const { user, accessToken } = useSessionContext();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user, accessToken]);

  const handleLogout = useCallback(() => {
    logout(accessToken);
  }, []);

  return (
    <header className="gnb-wrapper">
      <div className="gnb-title-wrapper">
        <Link to="/">
          <div className="gnb-img-wrapper">
            <img className="gnb-img" alt="gnb" src={logoImg} />
          </div>
        </Link>
        <>
          {!storeSelected ? (
            <Link to="/">
              <span className="gnb-title">와플스튜디오 메뉴 관리</span>
            </Link>
          ) : (
            <div className="gnb-selected">
              <h1 className="gnb-title-sm">와플스튜디오 메뉴 관리</h1>
              <div className="gnb-store">
                <h1 className="gnb-store-name">{storeName || '이름 없는 가게'}</h1>
                <span className="gnb-username">{`by ${username}` || '주인 없는 가게'}</span>
              </div>
            </div>
          )}
        </>
      </div>

      <div className="gnb-auth-wrapper">
        {accessToken ? (
          <>
            <span className="gnb-greeting">
              {loggedInUser?.username}
              님, 환영합니다!
            </span>
            <ButtonNormal text="내 가게" handleClick={() => navigate('/stores/1')} />
            <ButtonNormal text="로그아웃" handleClick={handleLogout} />
          </>
        ) : (
          <ButtonNormal text="로그인" handleClick={() => navigate('/login')} />
        )}
      </div>
    </header>
  );
}

export default Gnb;
