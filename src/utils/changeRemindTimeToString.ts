export const changeRemindTimeToString = (
  remindTime: 9 | 13 | 20,
): 'Morning' | 'Afternoon' | 'Evening' => {
  switch (remindTime) {
    case 9:
      return 'Morning';
    case 13:
      return 'Afternoon';
    case 20:
      return 'Evening';
  }
};
