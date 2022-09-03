import "./Gnb.css";

import { LOGO_URL } from "../../constant/constant";
import logoImg from "../../assets/logo.svg";

const Gnb = () => {
  return (
    <header className="gnb-wrapper">
      <a href={LOGO_URL} target="_blank" rel="noreferrer">
        <div className="gnb-title-wrapper">
          <div className="gnb-img-wrapper">
            <img className="gnb-img" alt="gnb" src={logoImg} />
          </div>
          <span className="gnb-title">{"와플스튜디오 메뉴 관리"}</span>
        </div>
      </a>
    </header>
  );
};

export default Gnb;
