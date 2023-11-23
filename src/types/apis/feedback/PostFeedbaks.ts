interface PostFeedbackRequestBody {
  rate: number;
}

export interface PostFeedbackRequest {
  feedbackId: number;
  body: PostFeedbackRequestBody;
}
