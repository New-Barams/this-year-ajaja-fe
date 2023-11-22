export const changeRemindTimeToNumber = (
  remindTime: 'Morning' | 'Afternoon' | 'Evening',
): 9 | 13 | 20 => {
  switch (remindTime) {
    case 'Morning':
      return 9;
    case 'Afternoon':
      return 13;
    case 'Evening':
      return 20;
  }
};
