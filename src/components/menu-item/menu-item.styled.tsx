import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';

interface List extends HTMLAttributes<HTMLLIElement> {
  isSelected?: boolean;
}

export const Item = styled.li<List>(
  ({ isSelected }) => `
  ${isSelected ? 'background: #ffd2d2;' : 'background: #fff;'}

  width: 100%;
  height: 41px;
  border-bottom: 1px solid #000;
  display: flex;

  &:hover {
    cursor: pointer;
    background: #ffd2d2;
  }
`,
);

export const MenuItemId = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 56px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
`;

export const MenuItemName = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 180px;
  margin-left: 15px;

  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
`;

export const MenuItemType = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 140px;
  margin-left: 15px;

  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
`;

export const MenuItemPrice = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 15px;
  min-width: 140px;

  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
`;

export const MenuItemRating = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  margin-left: 15px;
  min-width: 140px;
`;

export const MenuItemRatingText = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  margin-left: 6px;
`;
