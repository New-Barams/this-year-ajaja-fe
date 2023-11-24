export const changeRemindTimeToNumber = (
  remindTime: 'MORNING' | 'AFTERNOON' | 'EVENING',
): 9 | 13 | 20 => {
  switch (remindTime) {
    case 'MORNING':
      return 9;
    case 'AFTERNOON':
      return 13;
    case 'EVENING':
      return 20;
  }
};
