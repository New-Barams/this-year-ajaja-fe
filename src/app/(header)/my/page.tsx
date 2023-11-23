'use client';

import { postUsersLogOut } from '@/apis/client/postUsersLogOut';
import { refreshNickname } from '@/apis/client/refreshNickname';
import {
  Button,
  Icon,
  Modal,
  ModalBasic,
  ModalVerification,
  Tag,
} from '@/components';
import { useGetUserInformationQuery } from '@/hooks/apis/useGetUserInformationQuery';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import './index.scss';

type EmailData = {
  kakao: string | null;
  email: string | null;
};
export default function MyPage() {
  const { userInformation } = useGetUserInformationQuery();
  const { isEmailVerified, nickname, remindEmail } = userInformation;
  console.log(userInformation);
  const [myNickname, setMyNickname] = useState<string>(nickname);
  const [emailData, setEmailData] = useState<EmailData>({
    kakao: 'test@naver.com',
    email: null,
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isOpenEmailModal, setIsOpenEmailModal] = useState<boolean>(false);
  const [isOpenLogOutModal, setIsOpenLogOutModal] = useState<boolean>(false);
  const [isOpenWithdrawalModal, setIsOpenWithdrawalModal] =
    useState<boolean>(false);

  const handleChangeNickName = async () => {
    setIsFetching(true);
    try {
      const {
        data: { data: nickname },
      } = await refreshNickname();
      setMyNickname(nickname);
    } catch (error) {
      //TODO 에러 핸들링
      console.log('에러 났어 ㅠㅠ ');
    } finally {
      setIsFetching(false);
    }
  };
  const handleGoEmailVerification = () => {
    setIsOpenEmailModal(true);
  };
  const handleCloseEmailVerificationModal = useCallback(() => {
    setIsOpenEmailModal(false);
  }, []);
  const handleLogOut = () => {
    setIsOpenLogOutModal(true);
  };

  const handleRealLogOut = async () => {
    console.log('정말 아웃, 홈으로 ');
    await postUsersLogOut();
    deleteCookie('auth');
    //TODO에러핸들링, 리다이렉트
  };
  const handleCloseLogOutModal = () => {
    setIsOpenLogOutModal(false);
  };
  const handleWithdrawal = () => {
    setIsOpenWithdrawalModal(true);
  };
  const handleRealWithdrawal = () => {
    console.log('정말 회원 탈퇴 진행, 홈으로 ');
  };
  const handleCloseWithdrawalModal = () => {
    setIsOpenWithdrawalModal(false);
  };
  const handleSetVerifiedEmail = (text: string) => {
    setEmailData({ ...emailData, email: text });
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
          {myNickname}
          {isFetching ? (
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
            setVerifiedEmail={handleSetVerifiedEmail}
            handleCloseModal={handleCloseEmailVerificationModal}>
            이메일 인증
          </ModalVerification>
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
