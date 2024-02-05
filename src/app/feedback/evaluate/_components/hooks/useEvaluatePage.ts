import { usePostFeedbacksMutation } from '@/hooks/apis/usePostFeedbacksMutation';
import { AxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function useEvaluatePage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const month = searchParams.get('month');
  const day = searchParams.get('day');
  const planId = searchParams.get('planId');

  const [evaluateOption, setEvaluateOption] = useState(100);
  const [evaluateMessage, setEvaluateMessage] = useState('');
  const [errorCode, setErrorCode] = useState<null | number>();
  const [errorMessage, setErrorMessage] = useState('');
  const [isFeedbackSendModalOpen, setIsFeedbackSendModalOpen] = useState(false);
  const { mutate: postFeedbacks, error } = usePostFeedbacksMutation(
    parseInt(planId as string, 10),
  );

  if (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    if (status && status !== errorCode) {
      setErrorCode(status);
      switch (status) {
        case 400:
          setErrorMessage('피드백 기간이 아닙니다!');
          break;
        case 409:
          setErrorMessage('이미 평가된 피드백입니다!');
          break;
      }
    }
  }

  const handleChangeMessage = (changedMessage: string) => {
    setEvaluateMessage(changedMessage);
  };

  const handleModalClickNo = () => {
    setIsFeedbackSendModalOpen(false);
  };
  const handleModalClickYes = () => {
    postFeedbacks({
      planId: parseInt(planId as string, 10),
      body: { rate: evaluateOption, message: evaluateMessage },
    });
  };
  const handleModalOpen = () => {
    setIsFeedbackSendModalOpen(true);
  };
  return {
    searchParams,
    title,
    month,
    day,
    planId,
    evaluateOption,
    setEvaluateOption,
    evaluateMessage,
    setEvaluateMessage,
    errorCode,
    setErrorCode,
    errorMessage,
    setErrorMessage,
    isFeedbackSendModalOpen,
    setIsFeedbackSendModalOpen,
    postFeedbacks,
    error,
    handleChangeMessage,
    handleModalClickNo,
    handleModalClickYes,
    handleModalOpen,
  };
}
