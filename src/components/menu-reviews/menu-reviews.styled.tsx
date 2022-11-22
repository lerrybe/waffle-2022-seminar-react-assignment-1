import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: calc((100% - 20px) * 0.55);
  min-width: 320px;
  height: calc(100vh - 120px);
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 15px 20px;
  overflow: auto;
`;

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const RatingTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  margin-right: 5px;
`;

export const RatingText = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  margin-right: 5px;
`;

export const ReviewContentWrapper = styled.div`
  overflow: auto;
  width: 100%;
  height: calc(100vh - 400px);
  margin: 20px 0 40px 0;
`;

export const UlWrapper = styled.ul``;
