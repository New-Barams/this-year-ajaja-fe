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
  remindMessage: string;
  remindMonth: number;
  remindDay: number;
  reminded: boolean;
}

export interface RemindData {
  totalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: 'MORNING' | 'AFTERNOON' | 'EVENING';
  remindable: boolean;
  messageResponses: ReadOnlyRemindItemData[];
}
