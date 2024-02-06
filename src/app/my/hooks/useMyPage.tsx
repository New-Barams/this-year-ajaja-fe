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
import { useReducer } from 'react';

type ModalState = {
  emailModal: boolean;
  logOutModal: boolean;
  withdrawalModal: boolean;
  remindWayModal: boolean;
};
type ModalAction =
  | 'openEmailModal'
  | 'openLogOutModal'
  | 'openWithdrawalModal'
  | 'openRemindWayModal'
  | 'closeModal';

const INIT_MODAL_STATE: ModalState = {
  emailModal: false,
  logOutModal: false,
  withdrawalModal: false,
  remindWayModal: false,
};

const modalReducer = (state: ModalState, action: ModalAction) => {
  switch (action) {
    case 'openEmailModal':
      return {
        emailModal: true,
        logOutModal: false,
        withdrawalModal: false,
        remindWayModal: false,
      };
    case 'openLogOutModal':
      return {
        emailModal: false,
        logOutModal: true,
        withdrawalModal: false,
        remindWayModal: false,
      };
    case 'openRemindWayModal':
      return {
        emailModal: false,
        logOutModal: false,
        withdrawalModal: true,
        remindWayModal: false,
      };
    case 'openWithdrawalModal':
      return {
        emailModal: false,
        logOutModal: false,
        withdrawalModal: true,
        remindWayModal: false,
      };
    case 'closeModal':
      return {
        emailModal: false,
        logOutModal: false,
        withdrawalModal: false,
        remindWayModal: false,
      };
  }
};

export default function useMyPage() {
  const queryClient = useQueryClient();
  const { userInformation } = useGetUserInformationQuery();
  const { refreshNickname } = usePostUsersRefreshMutation();
  const { nickname, remindEmail, defaultEmail, receiveType, emailVerified } =
    userInformation;
  const { changeReceiveType, isChangeReceiveTypePending } =
    usePutUserReceiveMutation();
  const [modalState, dispatchModalState] = useReducer(
    modalReducer,
    INIT_MODAL_STATE,
  );

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

  const handleRealLogOut = async () => {
    router.push(KAKAO_LOGOUT_URL);
  };
  const handleRealWithdrawal = () => {
    deleteUsers().then(() => {
      deleteCookie('auth');
      router.push('/login');
      ajajaToast.success('회원탈퇴에 성공했습니다.');
    });
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
    modalState,
    receiveType,
    nickname,
    remindEmail,
    defaultEmail,
    emailVerified,
    isChangeReceiveTypePending,
    remindWay,
    dispatchModalState,
    handleSetVerifiedEmail,
    handleRealWithdrawal,
    handleRealLogOut,
    handleChangeNickName,
    handleChangeReceiveType,
  };
}
