import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Wrapper } from './error.styled';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.error('올바르지 않은 접근입니다.');
    navigate(-1);
  }, []);

  return <Wrapper>ERROR!</Wrapper>;
};

export default ErrorPage;
