import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';

import FormItem from '../form-item';

import { useSessionActionsContext } from '../../context/SessionContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useSessionActionsContext();

  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChangeFormData = useCallback(
    (e) => {
      const { name } = e.target;
      const { value } = e.target;
      setFormData({
        ...formData,
        [name]: value.trim(),
      });
    },
    [formData],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      login(formData);
      navigate('/');
    },
    [formData, navigate],
  );

  return (
    <div className="login-wrapper">
      <div className="login-inner-wrapper">
        <h1 className="login-header">로그인</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-inputs">
            <FormItem
              required
              name="name"
              label="ID"
              content={formData.name}
              placeholder="아이디를 입력해주세요."
              handleChangeContent={handleChangeFormData}
            />
            <FormItem
              required
              type="password"
              name="password"
              label="PASSWORD"
              content={formData.password}
              placeholder="비밀번호를 입력해주세요."
              handleChangeContent={handleChangeFormData}
            />
          </div>
          <button className="login-button" type="submit">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;