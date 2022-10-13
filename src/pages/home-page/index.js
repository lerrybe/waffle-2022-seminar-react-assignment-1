import "./home-page.css";
import { useSessionContext } from "../../context/SessionContext";
import { useMenuDataContext } from "../../context/MenuDataContext";

const HomePage = () => {
  const { userId, userPassword } = useSessionContext();
  const menus = useMenuDataContext();

  console.log("userId", userId);
  console.log("userPassword", userPassword);
  console.log("menus", menus);

  return <div>홈 화면입니다.</div>;
};

export default HomePage;
