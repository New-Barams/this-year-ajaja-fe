export const changeRemindTimeToString = (
  remindTime: 9 | 13 | 20,
): 'MORNING' | 'AFTERNOON' | 'EVENING' => {
  switch (remindTime) {
    case 9:
      return 'MORNING';
    case 13:
      return 'AFTERNOON';
    case 20:
      return 'EVENING';
  }
};
