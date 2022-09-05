export const numberToCommaString = (number) => {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
