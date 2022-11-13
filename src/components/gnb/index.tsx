import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import components & styling
import {
  Title,
  LogoImg,
  Wrapper,
  Greeting,
  StoreName,
  TitleSmall,
  ImgWrapper,
  TitleWrapper,
  AuthWrapper,
  OwnerWrapper,
  StoreWrapper,
  InnerTitleWrapper,
} from './gnb.styled';
import ButtonNormal from '../button-normal';
import logoImg from '../../assets/logo.svg';

// import context
import {
  useSessionContext,
  useSessionActionsContext,
} from '../../context/SessionContext';
import { Owner } from '../../types/auth';

interface Gnb {
  storeSelected?: boolean;
  storeName?: string;
  username?: string;
}

// DESC: global navbar
function Gnb({ storeSelected, storeName, username }: Gnb) {
  const navigate = useNavigate();
  const { logout } = useSessionActionsContext()!;
  const { user, accessToken } = useSessionContext()!;
  const [loggedInUser, setLoggedInUser] = useState<Owner | null>(null);

  useEffect(() => {
    if (user) {
      setLoggedInUser(user);
    }
  }, [user, accessToken]);

  const handleLogout = useCallback(() => {
    if (accessToken && logout) {
      logout(accessToken);
      window.location.href = '/';
    }
  }, []);

  return (
    <Wrapper>
      <TitleWrapper>
        <Link to="/">
          <ImgWrapper>
            <LogoImg alt="gnb" src={logoImg} />
          </ImgWrapper>
        </Link>
        <>
          {!storeSelected ? (
            <Link to="/">
              <Title>와플스튜디오 메뉴 관리</Title>
            </Link>
          ) : (
            <InnerTitleWrapper>
              <TitleSmall>와플스튜디오 메뉴 관리</TitleSmall>
              <StoreWrapper>
                <StoreName>{storeName || '이름 없는 가게'}</StoreName>
                <OwnerWrapper>
                  {`by ${username}` || '주인 없는 가게'}
                </OwnerWrapper>
              </StoreWrapper>
            </InnerTitleWrapper>
          )}
        </>
      </TitleWrapper>

      <AuthWrapper>
        {accessToken ? (
          <>
            <Greeting>
              {loggedInUser?.username}
              님, 환영합니다!
            </Greeting>
            <ButtonNormal
              text="내 가게"
              handleClick={() => navigate(`/stores/${loggedInUser?.id}`)}
            />
            <ButtonNormal text="로그아웃" handleClick={handleLogout} />
          </>
        ) : (
          <ButtonNormal text="로그인" handleClick={() => navigate('/login')} />
        )}
      </AuthWrapper>
    </Wrapper>
  );
}

export default Gnb;
