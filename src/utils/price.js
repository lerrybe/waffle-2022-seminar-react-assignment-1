export const numberToStringNumber = (number) => {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const stringNumberToNumber = (stringNumber) => {
  return Number(stringNumber.replace(/,/g, ""));
};

export const checkValidPrice = (string) => {
  const price = stringNumberToNumber(string);
  if (!string.trim()) {
    return {
      isValidPrice: false,
      announcement: "가격을 입력해주세요.",
    };
  } else if (price < 100) {
    return {
      isValidPrice: false,
      announcement: "가격은 100원 이상이어야 합니다.",
    };
  } else if (price > 1000000) {
    return {
      isValidPrice: false,
      announcement: "가격은 1,000,000원 이하여야 합니다.",
    };
  } else if (string[string.length - 1] !== "0") {
    return {
      isValidPrice: false,
      announcement: "최소 단위는 10원입니다.",
    };
  }

  return { isValidPrice: true, announcement: "성공!" };
};
