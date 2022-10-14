import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ErrorPage = () => {
  useEffect(() => {
    alert("잘못된 접근입니다.");
  }, []);

  return <Navigate to={-1} />;
};

export default ErrorPage;
