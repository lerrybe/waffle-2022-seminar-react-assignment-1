import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';

interface Wrapper extends HTMLAttributes<HTMLDivElement> {
  isOpenAnimation?: boolean;
}

export const Wrapper = styled.div<Wrapper>(
  ({ isOpenAnimation }) => `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -100%);
    }
  }
  width: 423px;
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 50px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;

  display: flex;
  flex-direction: column;
  
  ${
    isOpenAnimation
      ? `animation: fadeIn 0.3s ease-out`
      : `animation: fadeOut 0.3s ease-out`
  };
  
`,
);
