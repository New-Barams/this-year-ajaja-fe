import { deleteUsers } from '@/apis/client/deleteUsers';
import { ajajaToast } from '@/components/Toaster/customToast';
import { KAKAO_LOGOUT_URL } from '@/constants/login';
import { QUERY_KEY } from '@/constants/queryKey';
import { useGetUserInformationQuery } from '@/hooks/apis/useGetUserInformationQuery';
import { usePutUserReceiveMutation } from '@/hooks/apis/usePutUserReceiveMutation';
import { usePostUsersRefreshMutation } from '@/hooks/apis/useRefreshNicknameMutation';
import { ReceiveType } from '@/types/apis/users/GetUserInformation';
import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useMyPage() {
  const queryClient = useQueryClient();
  const { userInformation } = useGetUserInformationQuery();
  const { refreshNickname } = usePostUsersRefreshMutation();
  const { nickname, remindEmail, defaultEmail, receiveType, emailVerified } =
    userInformation;
  const { changeReceiveType, isChangeReceiveTypePending } =
    usePutUserReceiveMutation();
  const [isOpenEmailModal, setIsOpenEmailModal] = useState<boolean>(false);
  const [isOpenLogOutModal, setIsOpenLogOutModal] = useState<boolean>(false);
  const [isOpenWithdrawalModal, setIsOpenWithdrawalModal] =
    useState<boolean>(false);
  const [isOpenRemindWayModal, setIsOpenRemindWayModal] =
    useState<boolean>(false);
  const router = useRouter();
  const handleChangeNickName = () => {
    refreshNickname(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.USER_INFORMATION],
        });
        ajajaToast.success('닉네임이 변경되었습니다.');
      },
      onError: () => {
        ajajaToast.error('변경 실패, 다시 시도해주세요.');
      },
    });
  };
  const handleGoEmailVerification = () => {
    setIsOpenEmailModal(true);
  };
  const handleGORemindWay = () => {
    setIsOpenRemindWayModal(true);
  };
  const handleCloseEmailVerificationModal = () => {
    setIsOpenEmailModal(false);
  };
  const handleLogOut = () => {
    setIsOpenLogOutModal(true);
  };

  const handleRealLogOut = async () => {
    router.push(KAKAO_LOGOUT_URL);
  };
  const handleCloseLogOutModal = () => {
    setIsOpenLogOutModal(false);
  };
  const handleWithdrawal = () => {
    setIsOpenWithdrawalModal(true);
  };
  const handleRealWithdrawal = () => {
    deleteUsers().then(() => {
      deleteCookie('auth');
      router.push('/login');
      ajajaToast.success('회원탈퇴에 성공했습니다.');
    });
  };
  const handleCloseWithdrawalModal = () => {
    setIsOpenWithdrawalModal(false);
  };
  const handleSetVerifiedEmail = () => {
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER_INFORMATION],
      }),
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_PLANS] }),
    ]);
  };

  const handleChangeReceiveType = (checked: ReceiveType) => {
    if (checked === receiveType) {
      ajajaToast.error('기존과 다른 방식을 선택해주세요.');
      return;
    }
    changeReceiveType(checked, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.USER_INFORMATION],
        });
        ajajaToast.success('리마인드방식이 변경되었습니다.');
      },
      onError: () => {
        ajajaToast.error('변경 실패, 다시 시도해주세요.');
      },
    });
  };

  const createRemindWayText = () => {
    if (receiveType === 'both') {
      return (
        <>
          <span className="color-origin-primary">이메일</span>과{' '}
          <span className="color-origin-primary">카카오톡</span>
        </>
      );
    }
    return (
      <span className="color-origin-primary">
        {receiveType === 'email' ? '이메일' : '카카오톡'}
      </span>
    );
  };
  const remindWay = createRemindWayText();
  return {
    receiveType,
    nickname,
    remindEmail,
    defaultEmail,
    emailVerified,
    isChangeReceiveTypePending,
    isOpenEmailModal,
    isOpenLogOutModal,
    isOpenRemindWayModal,
    isOpenWithdrawalModal,
    handleChangeNickName,
    handleChangeReceiveType,
    handleCloseEmailVerificationModal,
    handleCloseLogOutModal,
    handleCloseWithdrawalModal,
    handleGORemindWay,
    handleGoEmailVerification,
    handleLogOut,
    handleRealLogOut,
    handleRealWithdrawal,
    handleSetVerifiedEmail,
    handleWithdrawal,
    remindWay,
    setIsOpenRemindWayModal,
  };
}
