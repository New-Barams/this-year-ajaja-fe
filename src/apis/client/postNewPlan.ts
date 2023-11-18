import { axiosInstanceClient } from '../axiosInstanceClient';

interface PostNewPlanRequestBody {
  title: string;
  description: string;
  remindTotalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: number;
  isPublic: boolean;
  tags: string[];
  messages: string[];
  icon: number;
}

export const postNewPlan = (body: PostNewPlanRequestBody) => {
  return axiosInstanceClient.post('/plans', { data: body });
};
