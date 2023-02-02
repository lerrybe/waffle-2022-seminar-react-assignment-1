import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 532px;
  height: 476px;
  overflow-y: auto;
  border: 1px solid #000000;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
`;

export const Header = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 10px;
`;

export const MenuFieldWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 15px 0;
  position: relative;

  &:last-of-type {
    padding-bottom: 0;
  }
`;

export const MenuFieldLabel = styled.label`
  width: auto;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  display: block;
  margin-bottom: 15px;
`;

export const MenuFieldInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  height: 30px;

  border: 1px solid #000000;
  border-radius: 5px;
`;

export const MenuFieldInputUnit = styled.span`
  position: absolute;
  right: 5px;
  bottom: 0px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  width: 14px;
  height: 60px;
  display: flex;
  align-items: center;
`;

export const MenuFieldSelect = styled.select`
  width: 100%;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  height: 30px;

  border: 1px solid #000000;
  border-radius: 5px;
`;

export const MenuFieldTextArea = styled.textarea`
  width: 100%;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  height: 70px;

  border: 1px solid #000000;
  border-radius: 5px;
  resize: none;
`;

export const ButtonWrapper = styled.div`
  margin-top: 10px;
  height: 30px;
  display: flex;
  justify-content: center;
`;
