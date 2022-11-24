import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`;

export const InnerWrapper = styled.div`
  flex-grow: 1;
  height: calc(100vh - 174px);
  padding: 20px;

  border-radius: 10px;
  overflow: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 15px;
  place-items: center;
  align-items: flex-start;
`;
