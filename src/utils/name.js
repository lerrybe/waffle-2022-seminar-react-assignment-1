const checkHangeulName = (name) => {
  const regex = /^[ㄱ-ㅎ|가-힣]+$/;
  return regex.test(name);
};

const checkUniqueName = (name, list, selectedId) => {
  const filteredList = list.filter((item) => item.name === name);
  if (filteredList.length > 0 && filteredList[0].id !== selectedId) {
    return false;
  }
  return true;
};

export const checkValidName = (name, list, selectedId) => {
  if (!name.trim()) {
    return {
      isValidName: false,
      announcement: "메뉴이름을 입력해주세요.",
    };
  } else if (name.length > 20) {
    return {
      isValidName: false,
      announcement: "메뉴이름은 20자 이하여야합니다.",
    };
  } else if (!checkUniqueName(name, list, selectedId)) {
    return {
      isValidName: false,
      announcement: "중복된 메뉴이름입니다.",
    };
  } else if (!checkHangeulName(name)) {
    return {
      isValidName: false,
      announcement: "한글 이름만 입력가능합니다.",
    };
  }

  return { isValidName: true, announcement: "성공!" };
};
