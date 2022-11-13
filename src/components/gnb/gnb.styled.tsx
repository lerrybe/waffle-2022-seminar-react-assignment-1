import styled from '@emotion/styled';

export const Wrapper = styled.header`
  min-width: 700px;
  flex-grow: 1;
  width: 100%;
  height: 80px;
  padding: 0 28px 0 10px;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImgWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

export const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const Title = styled.span`
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  display: flex;
  align-items: center;
`;

export const InnerTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleSmall = styled.h1`
  width: 136px;
  height: 17px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

export const StoreWrapper = styled.div`
  display: flex;
  margin-top: 3px;
  align-items: baseline;
`;

export const StoreName = styled.h1`
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  height: 32px;
  align-items: baseline;
  display: flex;
`;

export const OwnerWrapper = styled.span`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: baseline;
  color: #8a8a8a;
  margin-left: 7px;
`;

export const AuthWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Greeting = styled.span`
  font-size: 15px;
  line-height: 20px;
  margin-right: 15px;
`;
