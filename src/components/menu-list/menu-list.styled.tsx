import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterWrapper = styled.div`
  height: 80%;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
  margin-left: 20px;
`;

export const CategoryFilter = styled.select`
  height: 27px;
  width: 90px;
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
`;

export const Categories = styled.option``;

export const RatingFilter = styled.input`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

export const RatingAnnounce = styled.span`
  height: 25px;
  width: auto;
  font-size: 15px;
  margin-left: 15px;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  height: calc(100vh - 174px);
  padding: 0px 10px;

  border: 1px solid #000000;
  border-radius: 10px;
  overflow: auto;
  min-width: 680px;
`;

export const CategoryWrapper = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #000;
  padding: 16px 0;

  display: flex;
`;

export const CategoryID = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 56px;

  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
`;

export const CategoryName = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 180px;
  margin-left: 15px;

  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
`;

export const CategoryType = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 140px;
  margin-left: 15px;

  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
`;

export const CategoryPrice = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 15px;
  width: 140px;

  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
`;

export const CategoryRating = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  margin-left: 50px;
  min-width: 140px;

  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
`;

export const CreateMenuIcon = styled.img`
  width: 40px;
  height: 40px;

  position: absolute;
  right: 34px;
  bottom: 34px;
`;
