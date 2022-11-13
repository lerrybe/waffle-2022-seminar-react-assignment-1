import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormItem from '../form-item';

import { useSessionActionsContext } from '../../context/SessionContext';
import {
  Header,
  Wrapper,
  LoginForm,
  LoginButton,
  InnerWrapper,
  InputsWrapper,
} from './login.styled';

function Login() {
  const navigate = useNavigate();
  const { login } = useSessionActionsContext()!;

  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChangeFormData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      const { value } = e.target;
      setFormData({
        ...formData,
        [name]: value.trim(),
      });
    },
    [formData],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      login({
        username: formData?.name,
        password: formData?.password,
      });

      navigate('/');
    },
    [formData, navigate],
  );

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>로그인</Header>
        <LoginForm>
          <InputsWrapper>
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
          </InputsWrapper>
          <LoginButton onClick={handleClick}>로그인</LoginButton>
        </LoginForm>
      </InnerWrapper>
    </Wrapper>
  );
}

export default Login;
