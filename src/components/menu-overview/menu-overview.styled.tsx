import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 410px;
  height: calc(100vh - 120px);
  border: 1px solid #000000;
  border-radius: 10px;
  margin-left: 20px;
  position: relative;
  overflow: auto;
`;

export const CloseIcon = styled.img`
  width: 14px;
  height: 14px;

  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ThumbnailImg = styled.img`
  width: 210px;
  height: 200px;

  background: #d9d9d9;
  border: 1px solid #d9d9d9;
  border-radius: 50px;

  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: center;
`;

export const ThumbnailReplaceImg = styled.div`
  width: 210px;
  height: 200px;

  background: #d9d9d9;
  border: 1px solid #d9d9d9;
  border-radius: 50px;

  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: center;
`;

export const OverviewMenuName = styled.span`
  height: 36px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: flex-end;
  text-align: center;
  margin-bottom: 5px;
`;

export const OverviewMenuType = styled.span`
  height: 15px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 5px;
`;

export const OverviewMenuPrice = styled.span`
  height: 15px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 15px;
`;

export const OverviewMenuRating = styled.span`
  height: 15px;
  font-weight: 400;
  font-size: 25px;
  line-height: 25px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
  color: #f0975e;
`;
