import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ErrorPage = () => {
  useEffect(() => {
    alert("올바르지 않은 주소입니다.");
  }, []);

  return <Navigate to={-1} />;
};

export default ErrorPage;
