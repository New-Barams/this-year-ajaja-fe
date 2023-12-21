export interface EditRemindData {
  remindTotalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: 'MORNING' | 'AFTERNOON' | 'EVENING';
  messages: EditRemindItem[];
}

export interface EditRemindProps {
  planId: number;
  remindData: EditRemindData;
}

export interface EditRemindItem {
  content: string;
  remindMonth: number;
  remindDay: number;
}
