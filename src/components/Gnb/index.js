import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './gnb.css';
import logoImg from '../../assets/logo.svg';

import ButtonNormal from '../button-normal';

import { useSessionContext, useSessionActionsContext } from '../../context/SessionContext';

// DESC: global navbar
function Gnb() {
  const navigate = useNavigate();
  const { logout } = useSessionActionsContext();
  const { user, isLoggedIn } = useSessionContext();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user, isLoggedIn]);

  const handleLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <header className="gnb-wrapper">
      <Link to="/">
        <div className="gnb-title-wrapper">
          <div className="gnb-img-wrapper">
            <img className="gnb-img" alt="gnb" src={logoImg} />
          </div>
          <span className="gnb-title">와플스튜디오 메뉴 관리</span>
        </div>
      </Link>
      <div className="gnb-auth-wrapper">
        {isLoggedIn ? (
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
