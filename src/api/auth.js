import { clearAll, saveItem } from "../services/storage";
import { checkValidId, checkValidPassword } from "../utils/auth";

// TODO: backend API 연결
export const login = (id, password) => {
  if (checkValidId(id) && checkValidPassword(password)) {
    alert(`${id}님, 환영합니다!`);

    // localStorage에 로그인 상태 및 userId 저장
    saveItem("isLoggedIn", true);
    saveItem("userId", id);
    return true;
  } else {
    // TODO: 로그인 실패 시 처리 로직
    alert("로그인에 실패하였습니다.");
    return false;
  }
};

export const logout = () => {
  clearAll();
};
