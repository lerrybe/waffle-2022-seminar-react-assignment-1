import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 81px;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 7px 13px;
  overflow: auto;
  margin-bottom: 10px;
`;

export const Header = styled.div`
  display: flex;
`;

export const Username = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  margin-right: 5px;
`;

export const CreatedAtTime = styled.span`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #8a8a8a;
  margin-left: 8px;
`;

export const ButtonWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  margin-right: 5px;

  &:last-of-type {
    margin-right: 0;
  }
`;

export const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  margin-top: 6px;
`;

export const Icon = styled.img``;
