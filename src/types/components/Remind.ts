export type RemindOptionObjectType = {
  value: number;
  name: string;
};

export type RemindOptionType = {
  TotalPeriod: number;
  Term: number;
  Date: number;
  Time: 9 | 13 | 20;
};

export interface RemindItemType {
  date: {
    month: number;
    day: number;
  };
  message: string;
}

export interface ReadOnlyRemindItemData {
  feedbackId: number;
  remindMessage: string;
  remindMonth: number;
  remindDate: number;
  rate: number;
  isFeedback: boolean;
  isExpired: boolean;
  isReminded: boolean;
  endMonth: number;
  endDate: number;
}

export interface RemindData {
  isRemindable: boolean;
  remindTime: 'MORNING' | 'AFTERNOON' | 'EVENING';
  remindDate: number;
  remindTerm: number;
  remindTotalPeriod: number;
  sentRemindResponses: ReadOnlyRemindItemData[] | [];
  futureRemindResponses: ReadOnlyRemindItemData[] | [];
}
