// DESC: 타입의 경우 무조건 string으로, String 타입 캐스팅이 필요하다면 호출부에서 캐스팅
export const toStringNumberWithComma = (input: string) =>
  input.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

// DESC: 타입의 경우 무조건 string으로, String 타입 캐스팅이 필요하다면 호출부에서 캐스팅
export const toNumberWithoutComma = (input: string) =>
  Number(input.replace(/,/g, ''));

// DESC: 타입의 경우 무조건 string으로, String 타입 캐스팅이 필요하다면 호출부에서 캐스팅
export const checkValidPrice = (input: string) => {
  const price = toNumberWithoutComma(input);
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
