export interface EditPlanData {
  title: string;
  description: string;
  remindTotalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: 'MORNING' | 'AFTERNOON' | 'EVENING';
  isPublic: boolean;
  canRemind: boolean;
  canAjaja: boolean;
  tags: string[];
  messages: string[];
}

export interface editPlanProps {
  planId: number;
  planData: EditPlanData;
}
