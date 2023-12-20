import { RemindOptionObjectType } from '@/types/Remind';

export const TOTAL_PERIOD_OPTIONS: RemindOptionObjectType[] = [
  { value: 12, name: '1년' },
  { value: 6, name: '6개월' },
  { value: 3, name: '3개월' },
];

export const TERM_OPTIONS: RemindOptionObjectType[] = [
  { value: 12, name: '1년' },
  { value: 6, name: '6개월' },
  { value: 3, name: '3개월' },
  { value: 1, name: '1개월' },
];

export const DATE_OPTIONS: RemindOptionObjectType[] = Array.from(
  { length: 31 },
  (_, index) => ({
    value: index + 1,
    name: `${index + 1}일`,
  }),
);

export const TIME_OPTIONS: RemindOptionObjectType[] = [
  { value: 9, name: '아침(09시)' },
  { value: 13, name: '점심(13시)' },
  { value: 20, name: '저녁(20시)' },
];
