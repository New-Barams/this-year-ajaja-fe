import { FeedbackItemData } from '@/types/Feedbacks';

export interface GetFeedbacksResponse {
  success: boolean;
  data: FeedbacksData;
}

interface FeedbacksData {
  achieveRate: number;
  createdYear: number;
  title: string;
  remindTime: number;
  feedbacks: FeedbackItemData[];
}
