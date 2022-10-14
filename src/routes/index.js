import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "../pages/home-page";
import ErrorPage from "../pages/error-page";
import LoginPage from "../pages/login-page";
import StoresPage from "../pages/stores-page";
import MenusNewPage from "../pages/menus-new-page";
import MenusEditPage from "../pages/menus-edit-page";
import MenusDetailPage from "../pages/menus-detail-page";

// 라우팅 관리를 위한 EntryRoute, 기존 App을 대체
const EntryRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stores/:storeId" element={<StoresPage />} />
        <Route path="/menus/:menuId" element={<MenusDetailPage />} />
        <Route path="/menus/new" element={<MenusNewPage />} />
        <Route path="/menus/:menuId/edit" element={<MenusEditPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EntryRoute;
