export interface EditPlanData {
  iconNumber: number;
  title: string;
  description: string;
  isPublic: boolean;
  canAjaja: boolean;
  tags: string[];
}

export interface editPlanProps {
  planId: number;
  planData: EditPlanData;
}
