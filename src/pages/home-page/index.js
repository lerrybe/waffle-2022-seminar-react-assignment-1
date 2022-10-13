import "./home-page.css";
import Gnb from "../../components/gnb";

import { useSessionContext } from "../../context/SessionContext";
import { useMenuDataContext } from "../../context/MenuDataContext";

const HomePage = () => {
  const { userId, userPassword } = useSessionContext();
  const menus = useMenuDataContext();

  console.log("userId", userId);
  console.log("userPassword", userPassword);
  console.log("menus", menus);

  return (
    <>
      <Gnb />
      <div>홈화면입니다.</div>
    </>
  );
};

export default HomePage;
