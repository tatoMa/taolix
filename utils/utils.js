export const randomSelect5FromArray = (arr) => {
  return (arr.sort(() => 0.5 - Math.random()).slice(-5));
};
