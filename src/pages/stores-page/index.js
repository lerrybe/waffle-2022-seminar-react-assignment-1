import "./stores-page.css";

import Gnb from "../../components/gnb";
import Stores from "../../components/stores";

const StoresPage = () => {
  return (
    <>
      <Gnb />
      <div className="page-content-wrapper">
        <Stores />
      </div>
    </>
  );
};

export default StoresPage;
