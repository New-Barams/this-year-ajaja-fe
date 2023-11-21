import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

export interface PostNewPlanRequestBody {
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

export const postNewPlan = async (body: PostNewPlanRequestBody) => {
  const { data } = await axiosInstanceClient.post(DOMAIN.POST_PLANS, {
    data: body,
  });
  return data;
};
