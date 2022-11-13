const checkHangeulName = (name: string) => {
  const regex = /^[ㄱ-ㅎ|가-힣]+$/;
  return regex.test(name.replace(/(\s*)/g, ''));
};

export const checkValidName = (name: string) => {
  if (!name.trim()) {
    return {
      isValidName: false,
      announcement: '메뉴이름을 입력해주세요.',
    };
  }
  if (name.length > 20) {
    return {
      isValidName: false,
      announcement: '메뉴이름은 20자 이하여야합니다.',
    };
  }
  if (!checkHangeulName(name)) {
    return {
      isValidName: false,
      announcement: '한글 이름만 입력가능합니다.',
    };
  }

  return { isValidName: true, announcement: '성공!' };
};
