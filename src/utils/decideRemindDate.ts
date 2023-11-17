export const decideRemindDate = (period: number, term: number, day: number) => {
  if (term > period) {
    return null;
  }

  const dates = [];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const startMonth = term === 1 ? 2 : term;

  for (let month = startMonth; month <= period; month += term) {
    const lastDay = new Date(currentYear, month, 0).getDate();
    const remindDay = Math.min(day, lastDay);
    dates.push({ month: month, day: remindDay });
  }

  return dates;
};
