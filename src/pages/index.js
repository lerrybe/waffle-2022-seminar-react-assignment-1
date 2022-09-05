import "./menu-manage-page.css";

import Gnb from "../components/gnb";
import MenuList from "../components/menu-list";
import MenuDetail from "../components/menu-detail";

const MenuManagePage = () => {
  const dummyArr = [
    {
      id: 1,
      name: "초코와플",
      price: 7000,
      image: "",
    },
    {
      id: 2,
      name: "아메리카노",
      price: 4000,
      image: "",
    },
    {
      id: 3,
      name: "블루베리스무디",
      price: 6000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg",
    },
    {
      id: 4,
      name: "딸기와플",
      price: 7000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg",
    },
  ];

  return (
    <>
      <Gnb />
      <div className="page-content-wrapper">
        <MenuList menuItems={dummyArr} />
        <MenuDetail />
      </div>
    </>
  );
};

export default MenuManagePage;
