'use client';

import { deleteUsers } from '@/apis/client/deleteUsers';
import {
  Button,
  Icon,
  Modal,
  ModalBasic,
  ModalVerification,
  Tag,
} from '@/components';
import { KAKAO_LOGOUT_URL } from '@/constants/login';
import { QUERY_KEY } from '@/constants/queryKey';
import { useGetUserInformationQuery } from '@/hooks/apis/useGetUserInformationQuery';
import { usePostUsersRefreshMutation } from '@/hooks/apis/useRefreshNicknameMutation';
import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './index.scss';

export default function MyPage() {
  const queryClient = useQueryClient();
  const { userInformation } = useGetUserInformationQuery();
  const { refreshNickname, isPending } = usePostUsersRefreshMutation();
  const { isEmailVerified, nickname, remindEmail } = userInformation;

  const [isOpenEmailModal, setIsOpenEmailModal] = useState<boolean>(false);
  const [isOpenLogOutModal, setIsOpenLogOutModal] = useState<boolean>(false);
  const [isOpenWithdrawalModal, setIsOpenWithdrawalModal] =
    useState<boolean>(false);

  const router = useRouter();
  const handleChangeNickName = () => {
    refreshNickname(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.USER_INFORMATION],
        });
      },
    });
  };
  const handleGoEmailVerification = () => {
    setIsOpenEmailModal(true);
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
  const handleRealWithdrawal = async () => {
    await deleteUsers();
    deleteCookie('auth');
    router.push('/login');
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
  return (
    <>
      <div className="my-page">
        <Image
          src="/this-year-ajaja-logo.svg"
          width={240}
          height={160}
          alt="올해도 아좌좌"
        />
        <div className="my-page__main">
          <div className="my-page__main--nickname">
            <div className="my-page__name font-size-3xl">
              <h1 className="color-origin-orange-300 my-page__name--header">
                나의 이름은
              </h1>
              {nickname}
              {isPending ? (
                <div className="circle-rotate">
                  <Icon name="REFRESH" />
                </div>
              ) : (
                <button onClick={handleChangeNickName}>
                  <Icon name="REFRESH" />
                </button>
              )}
            </div>
            <div className="font-size-xs color-origin-gray-200">
              새로 고침 버튼 클릭 시 닉네임이 랜덤으로 변경됩니다.
            </div>
          </div>

          <div className="my-page__remind-way">
            {isEmailVerified ? (
              <h1>
                현재 <Tag color="green-300">이메일</Tag>을 통해서 리마인드를
                받고 있어요
              </h1>
            ) : (
              <>
                <Icon name="WARNING" />
                <h1>
                  현재 인증된 이메일이 없습니다. 인증을 진행하고 리마인드를
                  받으세요!
                </h1>
              </>
            )}
          </div>
        </div>

        <div className="my-page__email">
          <h1 className="font-size-2xl">
            이메일:
            {isEmailVerified ? remindEmail : '  ---'}
          </h1>
          <Button
            size="sm"
            background="primary"
            color="white-100"
            border={true}
            onClick={handleGoEmailVerification}>
            {isEmailVerified ? '이메일 변경하기' : '이메일 인증하기'}
          </Button>
        </div>

        <div className="my-page__bottom">
          <Button
            background="white-100"
            border={true}
            size="md"
            color="primary"
            onClick={handleLogOut}>
            로그아웃
          </Button>
          <Button
            background="white-100"
            color="primary"
            size="md"
            border={true}
            onClick={handleWithdrawal}>
            회원 탈퇴
          </Button>
        </div>
      </div>
      {isOpenEmailModal && (
        <Modal>
          <ModalVerification
            handleCloseModal={handleCloseEmailVerificationModal}
            setVerifiedEmail={handleSetVerifiedEmail}
          />
        </Modal>
      )}
      {isOpenLogOutModal && (
        <Modal>
          <ModalBasic
            onClickNo={handleCloseLogOutModal}
            onClickYes={handleRealLogOut}>
            로그아웃 하시겠습니까?
          </ModalBasic>
        </Modal>
      )}
      {isOpenWithdrawalModal && (
        <Modal>
          <ModalBasic
            onClickYes={handleRealWithdrawal}
            onClickNo={handleCloseWithdrawalModal}>
            정말 회원 탈퇴를 진행 하시겠습니까? 탈퇴시 모든 정보가 삭제됩니다.
          </ModalBasic>
        </Modal>
      )}
    </>
  );
}
