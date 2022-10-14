import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login-page.css";

import Gnb from "../../components/gnb";
import FormItem from "../../components/form-item";

import { login } from "../../api/auth";
import { useSessionActionsContext } from "../../context/SessionContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { dispatchUserId, dispatchIsLoggedIn } = useSessionActionsContext();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleChangeFormData = useCallback(
    (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setFormData({
        ...formData,
        [name]: value.trim(),
      });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { id, password } = formData;
      if (login(id, password)) {
        dispatchUserId(id);
        dispatchIsLoggedIn(true);
        navigate(-1);
      }
    },
    [dispatchIsLoggedIn, dispatchUserId, formData, navigate]
  );

  return (
    <>
      <Gnb />
      <div className="login-wrapper">
        <div className="login-inner-wrapper">
          <h1 className="login-header">로그인</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-inputs">
              <FormItem
                required
                name={"id"}
                label={"ID"}
                content={formData.id}
                placeholder={"아이디를 입력해주세요."}
                handleChangeContent={handleChangeFormData}
              />
              <FormItem
                required
                type={"password"}
                name={"password"}
                label={"PASSWORD"}
                content={formData.password}
                placeholder={"비밀번호를 입력해주세요."}
                handleChangeContent={handleChangeFormData}
              />
            </div>
            <button className="login-button" type="submit">
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
