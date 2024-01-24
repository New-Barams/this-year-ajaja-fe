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
import { usePutUserReceiveMutation } from '@/hooks/apis/usePutUserReceiveMutation';
import { usePostUsersRefreshMutation } from '@/hooks/apis/useRefreshNicknameMutation';
import { useScroll } from '@/hooks/useScroll';
import { ReceiveType } from '@/types/apis/users/GetUserInformation';
import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ModalRemindWay from './_components/ModalRemindWay/ModalRemindWay';
import './index.scss';

export default function MyPage() {
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
  const { handleScroll, scrollableRef } = useScroll();
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

  const remindWay = () => {
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
  return (
    <>
      <div
        className="my-page__wrapper"
        ref={scrollableRef}
        onScroll={handleScroll}>
        <h1 className="my-page__header font-size-xl">마이페이지</h1>

        <div className="my-page__content">
          <h1 className="my-page__welcome-text font-size-xl">
            <span>안녕하세요, </span>
            <span>
              <span className="color-origin-primary">{nickname}</span>님!
            </span>
          </h1>
          <div className="my-page__nick-name">
            <h2 className="my-page__nick-name--label font-size-lg">닉네임</h2>
            <div className="my-page__nick-name--content">
              <div className="my-page__nick-name--content--main">
                {nickname}
                <button onClick={handleChangeNickName}>
                  <Icon
                    name="REFRESH"
                    color="text-100"
                    size="xl"
                    isFilled={true}
                  />
                </button>
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
            <div className="my-page__account--content font-size-base">
              <div className="my-page__account--content--kakao ">
                <h3>카카오톡 : {defaultEmail} </h3>
              </div>
              <div className="my-page__account--content--email">
                <h3>
                  이메일 :{' '}
                  {emailVerified ? remindEmail : '이메일 인증이 필요합니다.'}{' '}
                </h3>
              </div>
            </div>
            <Button
              border={false}
              background="primary"
              color="white-100"
              onClick={handleGoEmailVerification}>
              이메일 {emailVerified ? '변경' : '인증'}
            </Button>
          </div>
          <div className="my-page__remindway">
            <h2 className="my-page__remindway--label font-size-lg">
              리마인드 및 응원 메시지
            </h2>
            <div className="my-page__remindway--content font-size-base">
              {remindWay()}을 통해서 리마인드 및 응원 메시지를 받고 있어요
            </div>
            <Button
              border={false}
              background="primary"
              color="white-100"
              onClick={handleGORemindWay}>
              알림 방식 변경
            </Button>
          </div>
          <div className="my-page__etc font-size-base">
            <Link
              className="my-page__etc--notice color-origin-text-100"
              href={'/notice'}>
              공지사항
            </Link>
            <button
              className="my-page__etc--logout color-origin-text-100"
              onClick={handleLogOut}>
              로그아웃
            </button>
            <button
              className="my-page__etc--withdrawal color-origin-text-300"
              onClick={handleWithdrawal}>
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
      {isOpenRemindWayModal && (
        <Modal>
          <ModalRemindWay
            isVerified={emailVerified}
            confirmSentence="변경하기"
            isPending={isChangeReceiveTypePending}
            receiveType={receiveType}
            onClickYes={handleChangeReceiveType}
            onClickNo={() => {
              setIsOpenRemindWayModal(false);
            }}>
            알림 방식 변경
          </ModalRemindWay>
        </Modal>
      )}
      {isOpenEmailModal && (
        <Modal>
          <ModalVerification
            handleCloseModal={handleCloseEmailVerificationModal}
            setVerifiedEmail={handleSetVerifiedEmail}
            defaultValue={emailVerified ? '' : defaultEmail}>
            이메일 {emailVerified ? '변경' : '인증'}
          </ModalVerification>
        </Modal>
      )}
      {isOpenLogOutModal && (
        <Modal>
          <ModalBasic
            onClickNo={handleCloseLogOutModal}
            onClickYes={handleRealLogOut}
            confirmSentense="로그아웃 하기">
            로그아웃 하시겠습니까?
          </ModalBasic>
        </Modal>
      )}
      {isOpenWithdrawalModal && (
        <Modal>
          <ModalBasic
            onClickYes={handleRealWithdrawal}
            onClickNo={handleCloseWithdrawalModal}
            confirmSentense="회원탈퇴 하기">
            정말 회원 탈퇴를 진행 하시겠습니까? 탈퇴시 모든 정보가 삭제됩니다.
          </ModalBasic>
        </Modal>
      )}
    </>
  );
}
