export interface EditPlanData {
  title: string;
  description: string;
  remindTotalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: 'Morning' | 'Afternoon' | 'Evening';
  isPublic: boolean;
  canRemind: boolean;
  canAjaja: boolean;
  tags: string[];
  messages: string[];
}
