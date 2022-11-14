import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid #000000;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #e0eafc;
  }
`;

export const Storename = styled.h1`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  height: 24px;
  overflow: auto;
`;

export const Username = styled.h6`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  color: #8a8a8a;
  overflow: auto;
`;

export const StoreDescription = styled.h4`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  height: 80px;
  overflow: auto;
  margin-top: 10px;
`;
