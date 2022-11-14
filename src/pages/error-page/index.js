import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { toast } from 'react-toastify';

function ErrorPage() {
  useEffect(() => {
    toast.error('올바르지 않은 접근입니다.');
  }, []);

  return <Navigate to={-1} />;
}

export default ErrorPage;
