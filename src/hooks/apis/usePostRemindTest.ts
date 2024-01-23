import { postRemindTest } from '@/apis/client/postRemindTest';
import { ajajaToast } from '@/components/Toaster/customToast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const usePostRemindTest = () => {
  return useMutation({
    mutationFn: postRemindTest,
    onSuccess: (data) => {
      console.log(data);
      ajajaToast.success('리마인드 테스트 성공');
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response) {
        const statusCode = axiosError.response.status;
        if (statusCode === 429) {
          // 3회 초과 시도 시
          ajajaToast.error('3번을 초과했습니다.');
        }
      }
      ajajaToast.error('리마인드 테스트 실패');
    },
  });
};
