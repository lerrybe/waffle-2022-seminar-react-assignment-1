import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./gnb.css";
import logoImg from "../../assets/logo.svg";

import ButtonNormal from "../button-normal";

// global navbar
const Gnb = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(true);
  const [username] = useState("예지");

  return (
    <header className="gnb-wrapper">
      <Link to={"/"}>
        <div className="gnb-title-wrapper">
          <div className="gnb-img-wrapper">
            <img className="gnb-img" alt="gnb" src={logoImg} />
          </div>
          <span className="gnb-title">와플스튜디오 메뉴 관리</span>
        </div>
      </Link>
      <div className="gnb-auth-wrapper">
        {isLoggedIn ? (
          <div>
            <span className="gnb-greeting">{username}님, 환영합니다!</span>
            <ButtonNormal
              text={"내 가게"}
              handleClick={() => navigate("/stores/1")}
            />
            <ButtonNormal
              text={"로그아웃"}
              handleClick={() => console.log("로그아웃")}
            />
          </div>
        ) : (
          <ButtonNormal
            text={"로그인"}
            handleClick={() => navigate("/login")}
          />
        )}
      </div>
    </header>
  );
};

export default Gnb;
