import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerWrapper = styled.div`
  width: 532px;
  padding: 15px 20px 10px;
  border-radius: 10px;
  border: 1px solid #000000;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
`;

export const LoginForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputsWrapper = styled.div`
  flex-grow: 1;
`;

export const LoginButton = styled.div`
  width: 80px;
  height: 66px;
  border-radius: 5px;
  border: 1px solid #000000;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
