export const checkIsSeason = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  return (
    currentMonth ===
    parseInt(process.env.NEXT_PUBLIC_SEASON_MONTH as string, 10)
  );
};
