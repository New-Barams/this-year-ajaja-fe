export type RemindOptionsTypes = {
  value: number;
  name: string;
};

export interface ReadOnlyRemindItemType {
  remindMonth: number;
  remindDay: number;
  remindMessage: string;
  isReminded: boolean; // 리마인드 받았는지 여부
  isFeedback: boolean; // 피드백 했는지 여부
  feedbackId: number;
  rate: number;
  isExpired: boolean; // 피드백 기간 만료되었는지 여부
  deadLine: string;
}

export interface ReadOnlyRemindType {
  isRemindable: boolean;
  remindTime: number;
  remindDate: number;
  remindTerm: number;
  remindTotalPeriod: number;
  remindMessageList: ReadOnlyRemindItemType[];
}
