import styled from '@emotion/styled';

export const OuterWrapper = styled.div`
  width: calc((100% - 20px) * 0.45);
  min-width: 320px;
  height: auto;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`;

export const GoBackWrapper = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

export const GoBackButton = styled.button`
  display: flex;
  align-items: center;
`;

export const MenuInfoWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 168px);
  border: 1px solid #000000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

export const Img = styled.img`
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

export const NonThumnailImg = styled.div`
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

export const MenuName = styled.span`
  height: 36px;

  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: flex-end;
  text-align: center;
  margin-bottom: 5px;
`;

export const MenuType = styled.span`
  height: 15px;

  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 5px;
`;

export const MenuPrice = styled.span`
  height: 15px;

  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  align-items: center;
  text-align: center;

  margin-bottom: 30px;
`;

export const MenuDescription = styled.span`
  height: 15px;

  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  display: flex;
  align-items: center;
  text-align: center;

  margin-bottom: 20px;
`;

export const CRUDWrapper = styled.div`
  width: 96px;
  display: flex;
  justify-content: space-between;
`;

export const IconButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000000;
  border-radius: 100px;
`;
