import { useEffect, useState } from 'react';

import Dim from '../dim';
import { Wrapper } from './modal-wrapper.styled';

interface ModalWrapper {
  open: boolean;
  children: React.ReactNode;
  handleCloseModal: () => void;
}

const ModalWrapper: React.FC<ModalWrapper> = ({
  open,
  children,
  handleCloseModal,
}: ModalWrapper) => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    open ? setAnimate(true) : setAnimate(false);
  }, [open]);

  return (
    <>
      <Dim handleCloseModal={handleCloseModal} />
      <Wrapper isOpenAnimation={animate}>{children}</Wrapper>
    </>
  );
};

export default ModalWrapper;
