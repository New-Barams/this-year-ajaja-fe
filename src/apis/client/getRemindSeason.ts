import { DOMAIN } from '@/constants/api';
import { GetRemindResponse } from '@/types/apis/remind/getRemind';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getRemindSeason = async (
  planId: number,
): Promise<GetRemindResponse> => {
  console.log('리마인드 정보조회 시즌 API 호출');
  const { data } = await axiosInstanceClient.get(
    DOMAIN.GET_REMINDS_MODIFY(planId),
  );

  console.log(`받아온 data`);
  console.log(data);

  return data;
};
