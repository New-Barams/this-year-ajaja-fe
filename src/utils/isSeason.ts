export const isSeason = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  return currentMonth === 0;
};
