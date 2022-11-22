import styled from '@emotion/styled';

export const ContentWrapper = styled.div`
  width: 532px;
  height: 456px;
  overflow-y: auto;
  border: 1px solid #000000;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 20px 16px;
`;

export const HeaderTitle = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 10px;
`;

export const MenuNameWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
`;

export const MenuNameLabel = styled.label`
  width: auto;
  font-weight: 700;
  font-size: 15px;
  display: block;
`;

export const MenuNameValue = styled.span`
  margin-left: 80px;
  flex-grow: 1;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  display: block;
`;

export const MenuTypeWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
`;

export const MenuTypeTitle = styled.label`
  width: auto;
  font-weight: 700;
  font-size: 15px;
  display: block;
`;

export const MenuTypeValue = styled.span`
  margin-left: 80px;
  flex-grow: 1;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  display: block;
`;

export const MenuPriceWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 14px 0;
  position: relative;
`;

export const MenuPriceTitle = styled.label`
  width: auto;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  display: block;
  margin-bottom: 15px;
`;

export const MenuPriceInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  height: 30px;

  border: 1px solid #000000;
  border-radius: 5px;
`;

export const MenuPriceUnit = styled.span`
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

export const MenuImgWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 14px 0;
  position: relative;
`;

export const MenuImgTitle = styled.label`
  width: auto;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  display: block;
  margin-bottom: 15px;
`;

export const MenuImgInput = styled.input`
  width: 100%;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  height: 30px;

  border: 1px solid #000000;
  border-radius: 5px;
`;

export const MenuDescriptionWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 14px 0;
  position: relative;

  &:last-of-type {
    padding-bottom: 0px;
  }
`;

export const MenuDescriptionTitle = styled.label`
  width: auto;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  display: block;
  margin-bottom: 15px;
`;

export const MenuDescriptionTextarea = styled.textarea`
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
