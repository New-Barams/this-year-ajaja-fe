export type RemindOptionObjectType = {
  value: number;
  name: string;
};

export type RemindOptionType = {
  TotalPeriod: number;
  Term: number;
  Date: number;
  Time: number;
};

export interface RemindItemType {
  date: {
    month: number;
    day: number;
  };
  message: string;
}

export interface ReadOnlyRemindItemData {
  remindMonth: number;
  remindDay: number;
  remindMessage: string;
  isReminded?: boolean; // 리마인드 받았는지 여부
  isFeedback?: boolean; // 피드백 했는지 여부
  feedbackId?: number;
  rate?: number;
  isExpired?: boolean; // 피드백 기간 만료되었는지 여부
  deadLine?: string;
}

export interface ReadOnlyRemindData {
  isRemindable: boolean;
  remindTime: number;
  remindDate: number;
  remindTerm: number;
  remindTotalPeriod: number;
  remindMessageList: ReadOnlyRemindItemData[];
}
