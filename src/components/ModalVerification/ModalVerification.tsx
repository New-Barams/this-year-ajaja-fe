'use client';

import { Button, Icon } from '@/components';
import { usePostSendVerificationMutation } from '@/hooks/apis/usePostSendVerificationMutation';
import { usePostVerifyMutation } from '@/hooks/apis/usePostVerifyMutation';
import { checkEmailValidation } from '@/utils/checkEmailValidation';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './index.scss';

interface ModalVerificationProps {
  handleCloseModal: () => void;
  setVerifiedEmail?: (text: string) => void;
}
export default function ModalVerification({
  handleCloseModal,
  setVerifiedEmail,
}: ModalVerificationProps) {
  const {
    mutateAsync: submitEmail,
    isError,
    isPending,
    isSuccess,
    error,
  } = usePostSendVerificationMutation();
  const {
    mutateAsync: submitCertification,
    isPending: isVerifyPending,
    isError: isVerifyError,
    error: verifyError,
    isSuccess: isVerifySuccess,
  } = usePostVerifyMutation();
  useEffect(() => {
    console.log(
      `isPending: ${isVerifyPending}, isError:${isVerifyError},error: ${verifyError?.message} isSuccess:${isVerifySuccess} `,
    );
  }, [isVerifyPending, isVerifyError, verifyError, isVerifySuccess]);

  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmitEmail = async () => {
    const isValidate = checkEmailValidation(email);
    if (isValidate) {
      submitEmail(email);
    }
  };
  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    setCode(inputValue);
  };
  const handleSubmitCode = () => {
    if (code.length == 6) {
      submitCertification(code);
      setVerifiedEmail && setVerifiedEmail(email);
    }
  };
  return (
    <div
      className={classNames(
        `modal-verification-wrapper`,
        'border-origin-primary',
        'background-origin-white-100',
      )}>
      <div
        className={classNames('modal-verification-wrapper__exit')}
        onClick={handleCloseModal}>
        <Icon name="CLOSE" color="gray-300" size="3xl" />
      </div>

      <div className={classNames(`modal-verification-wrapper__content`)}>
        <h1
          className={classNames(
            `font-size-2xl`,
            `color-origin-gray-300`,
            `modal-verification-wrapper__text`,
          )}>
          이메일 인증
        </h1>

        <div className="modal-verification-wrapper__items">
          <div className="modal-verification-wrapper__items--item">
            <input
              type="email"
              onChange={handleChangeEmail}
              placeholder="이메일을 입력해주세요"
            />
            <Button
              size="sm"
              border={false}
              color="white-100"
              background="primary"
              onClick={handleSubmitEmail}>
              인증코드 보내기
            </Button>
          </div>
          <div className="font-size-xs modal-verification-wrapper__items--item--message">
            {isPending && <div>코드 전송중</div>}
            {isError && (
              <div className="color-origin-primary">{error?.message}</div>
            )}
            {isSuccess && (
              <div className="color-origin-green-300">
                이메일에서 인증코드를 확인해주세요
              </div>
            )}
          </div>
          <div className="modal-verification-wrapper__items--item">
            <input
              placeholder="인증 코드를 입력해주세요"
              value={code}
              onChange={handleChangeCode}
            />
            <div className={classNames(!isSuccess && 'visible-hidden')}>
              <Button
                border={false}
                size="sm"
                color="white-100"
                background="primary"
                onClick={handleSubmitCode}>
                인증코드 확인
              </Button>
            </div>
          </div>

          <div className="font-size-xs modal-verification-wrapper__items--item--message">
            {isVerifyPending && <div>인증 코드 확인중...</div>}
            {isVerifySuccess && (
              <div className="color-origin-green-300">
                인증에 성공하셨습니다.
              </div>
            )}
            {isVerifyError && (
              <div className="color-origin-primary">{verifyError?.message}</div>
            )}
          </div>
        </div>

        <Button
          background="primary"
          color="white-100"
          size="md"
          border={false}
          onClick={handleCloseModal}>
          인증 완료
        </Button>
      </div>
    </div>
  );
}
