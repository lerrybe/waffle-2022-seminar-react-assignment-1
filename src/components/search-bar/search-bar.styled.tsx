import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: auto;
  height: 54px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Label = styled.span`
  width: auto;
  font-weight: 400;
  font-size: 15px;
  margin-right: 10px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 413px;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  padding: 5px;
  width: 100%;
  height: 34px;
  border: 1px solid #8a8a8a;
  border-radius: 5px;
`;

export const SearchIcon = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;

  right: 10px;
`;
