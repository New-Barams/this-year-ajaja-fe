export const checkIsSeason = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  return currentMonth === 0;
};
