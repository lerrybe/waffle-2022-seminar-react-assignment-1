export const toStringNumberWithComma = (input) =>
  String(input).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

export const toNumberWithoutComma = (input) =>
  Number(String(input).replace(/,/g, ''));

export const checkValidPrice = (input) => {
  const price = toNumberWithoutComma(String(input));
  const strPrice = String(price);
  if (!strPrice.trim()) {
    return {
      isValidPrice: false,
      announcement: '가격을 입력해주세요.',
    };
  }
  if (price < 100) {
    return {
      isValidPrice: false,
      announcement: '가격은 100원 이상이어야 합니다.',
    };
  }
  if (price > 1000000) {
    return {
      isValidPrice: false,
      announcement: '가격은 1,000,000원 이하여야 합니다.',
    };
  }
  if (strPrice[strPrice.length - 1] !== '0') {
    return {
      isValidPrice: false,
      announcement: '최소 단위는 10원입니다.',
    };
  }

  return { isValidPrice: true, announcement: '성공!' };
};
