export interface GetFeedbacksResponse {
  success: boolean;
  data: FeedbacksData;
}

interface FeedbacksData {
  achieveRate: number;
  planName: string;
  totalPeriod: number;
  remindTerm: number;
  remindDay: number;
  feedbacks: [
    {
      feedbackId: number;
      achieve: number;
      message: string;
      remindMonth: number;
      remindDay: number;
      feedbacked: boolean;
    },
  ];
}
