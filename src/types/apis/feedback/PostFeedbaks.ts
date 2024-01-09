interface PostFeedbacksRequestBody {
  rate: number;
  message: string;
}

export interface PostFeedbacksRequest {
  planId: number;
  body: PostFeedbacksRequestBody;
}
