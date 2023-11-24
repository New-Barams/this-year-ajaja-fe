'use client';

import { deleteUsers } from '@/apis/client/deleteUsers';
import { postUsersLogOut } from '@/apis/client/postUsersLogOut';
import {
  Button,
  Icon,
  Modal,
  ModalBasic,
  ModalVerification,
  Tag,
} from '@/components';
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
        queryClient.invalidateQueries({ queryKey: ['userInformation'] });
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
    await postUsersLogOut();
    deleteCookie('auth');
    router.push('/login');
    //TODO에러핸들링,
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
    queryClient.invalidateQueries({ queryKey: ['userInformation'] });
  };
  return (
    <>
      <div className="my-page">
        <Image
          src="/this-year-ajaja-logo.svg"
          width={174}
          height={128}
          alt="올해도 아좌좌"
        />
        <div className="my-page__name font-size-2xl">
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
        <div className="my-page__remind-way">
          {isEmailVerified ? (
            <h1>
              현재 <Tag color="green-300">이메일</Tag>을 통해서 리마인드를 받고
              있어요
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
        <div className="my-page__email">
          <h1>
            이메일:
            {isEmailVerified ? remindEmail : '  ---'}
          </h1>
          <Button
            size="sm"
            background="white-100"
            color="primary"
            border={true}
            onClick={handleGoEmailVerification}>
            이메일 변경하기
          </Button>
        </div>
        <div className="my-page__bottom">
          <Button
            background="white-100"
            border={true}
            size="lg"
            color="primary"
            onClick={handleLogOut}>
            로그아웃
          </Button>
          <Button
            background="white-100"
            color="primary"
            size="lg"
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
