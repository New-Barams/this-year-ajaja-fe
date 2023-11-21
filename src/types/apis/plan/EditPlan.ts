export interface EditPlanData {
  title: string;
  description: string;
  remindTotalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: number;
  isPublic: boolean;
  canRemind: boolean;
  canAjaja: boolean;
  tags: string[];
  messages: string[];
}
