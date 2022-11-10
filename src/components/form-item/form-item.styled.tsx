import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 28px;
  position: relative;
  margin-bottom: 10px;

  &:first-of-type {
    margin-top: 10px;
  }
`;

export const FormLabel = styled.label`
  min-width: 87px;
  height: 28px;

  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

export const FormInput = styled.input`
  padding: 5px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  height: 30px;

  flex-grow: 1;
  border-radius: 5px;
  border: 1px solid #8a8a8a;
`;

export const FormUnit = styled.span`
  position: absolute;
  right: 5px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;

  width: 14px;
  height: 20px;

  display: flex;
  align-items: center;
  text-align: right;
`;
