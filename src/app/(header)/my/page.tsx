'use client';

import { deleteUsers } from '@/apis/client/deleteUsers';
import {
  Button,
  Icon,
  Modal,
  ModalBasic,
  ModalVerification,
} from '@/components';
import { ajajaToast } from '@/components/Toaster/customToast';
import { KAKAO_LOGOUT_URL } from '@/constants/login';
import { QUERY_KEY } from '@/constants/queryKey';
import { useGetUserInformationQuery } from '@/hooks/apis/useGetUserInformationQuery';
import { usePostUsersRefreshMutation } from '@/hooks/apis/useRefreshNicknameMutation';
import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './index.scss';

export default function MyPage() {
  const queryClient = useQueryClient();
  const { userInformation } = useGetUserInformationQuery();
  const { refreshNickname } = usePostUsersRefreshMutation();
  const { nickname, remindEmail, defaultEmail, receiveType } = userInformation;

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
    deleteCookie('auth');
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
  return (
    <>
      <div className="my-page__wrapper">
        <h1 className="my-page__header font-size-xl">마이페이지</h1>
        <h1 className="my-page__welcome-text font-size-xl">
          안녕하세요, <span className="color-origin-primary">{nickname}</span>
          님!
        </h1>
        <div className="my-page__nick-name">
          <h2 className="my-page__nick-name--label font-size-lg">닉네임</h2>
          <div className="my-page__nick-name--content">
            <div>
              {nickname}
              <span onClick={handleChangeNickName}>
                <Icon
                  name="REFRESH"
                  color="text-100"
                  size="base"
                  isFilled={true}
                />
              </span>
            </div>
            <div className="my-page__nick-name--content--alert font-size-xs">
              새로고침 버튼 클릭시 닉네임이 랜덤으로 변경됩니다.
            </div>
          </div>
        </div>
        <div className="my-page__account">
          <h2 className="my-page__account--label font-size-lg">
            연결된 계정 및 이메일
          </h2>
          <div className="my-page__account--content">
            <div className="my-page__account--content--kakao">
              <h3>카카오톡</h3>
              {defaultEmail}
            </div>
            <div className="my-page__account--content--email">
              <h3>이메일</h3>
              {remindEmail}
            </div>
          </div>
          <Button
            border={false}
            background="primary"
            color="white-100"
            onClick={handleGoEmailVerification}>
            이메일 변경
          </Button>
        </div>
        <div className="my-page__remindway">
          <h2 className="my-page__remindway--label font-size-lg">
            리마인드 방식
          </h2>
          <div>
            <span className="color-origin-primary">{receiveType}</span>을 통해서
            리마인드 받고 있어요
          </div>
          <Button
            border={false}
            background="primary"
            color="white-100"
            onClick={handleGORemindWay}>
            리마인드 방식 변경
          </Button>
        </div>
        <div className="my-page__etc">
          <div className="my-page__etc--logout" onClick={handleLogOut}>
            로그 아웃
          </div>
          <div
            className="my-page__etc--withdrawal color-origin-text-300"
            onClick={handleWithdrawal}>
            회원 탈퇴
          </div>
        </div>
      </div>
      {isOpenRemindWayModal && <div></div>}
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
