export const currentMonth = () => {
  const currentDate = new Date();
  return currentDate.getMonth() + 1;
};
