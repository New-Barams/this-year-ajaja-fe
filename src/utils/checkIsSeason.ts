export const checkIsSeason = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  return (
    currentMonth ===
    parseInt(process.env.NEXT_PUBLIC_SEASON_MONTH as string, 10)
  ); // TODO: 일단 현재는 무조건 시즌으로 동작하도록
};
