import { requestEmailVerification } from '@/apis/client/requestEmailVerification';
import { Button, Icon } from '@/components';
import classNames from 'classnames';
import { useState } from 'react';
import './index.scss';

//TODO 리렌더링 최적화 필요, 이메일 검증 함수 분리
const EmailRegExp = new RegExp(
  '^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
);

interface ModalVerificationPorps {
  handleCloseModal: () => void;
  setVerifiedEmail: (text: string) => void;
  children: React.ReactNode;
}
export default function ModalVerification({
  handleCloseModal,
  setVerifiedEmail,
  children,
}: ModalVerificationPorps) {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState('');
  const [emailState, setEmailState] = useState({
    isFetching: false,
    success: false,
    error: false,
  });
  const [verificationState, setVerificationState] = useState({
    isFetching: false,
    success: false,
    error: false,
  });
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmitEmail = async () => {
    if (EmailRegExp.test(email)) {
      setEmailState({ error: false, success: false, isFetching: true });
      console.log('이메일 전송중');
      try {
        const { data } = await requestEmailVerification(email);
        console.log(data);
        setEmailState({ error: false, success: true, isFetching: false });
      } catch (error) {
        //TODO 에러핸들링
        console.log(error);
        setEmailState({ isFetching: false, error: true, success: false });
      }
    } else {
      setEmailState({ isFetching: false, success: false, error: true });
    }
  };
  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };
  const handleSubmitCode = () => {
    setVerificationState({ success: false, error: false, isFetching: true });
    setTimeout(() => {
      setVerificationState({ success: true, error: false, isFetching: false });
      //TODO 모달분리를 위해 선택 함수로 분리, 실패시 백엔드 에러메세지 전달
      setVerifiedEmail(email);
    });
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
        <div
          className={classNames(
            `font-size-2xl`,
            `color-origin-gray-300`,
            `modal-verification-wrapper__text`,
          )}>
          {children}
        </div>

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
            {emailState.isFetching && <div>코드 전송중</div>}
            {emailState.error && (
              <div className="color-origin-primary">
                이메일 형식이 옳지 않습니다. 이메일을 확인해주세요{' '}
              </div>
            )}
            {emailState.success && (
              <div className="color-origin-green-300">
                이메일에서 인증코드를 확인해주세요
              </div>
            )}
          </div>
          <div className="modal-verification-wrapper__items--item">
            <input
              type="text"
              placeholder="인증 코드를 입력해주세요"
              value={code}
              onChange={handleChangeCode}
            />
            <div
              className={classNames(!emailState.success && 'visible-hidden')}>
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
            {verificationState.isFetching && <div>인증 코드 확인중...</div>}
            {verificationState.success && (
              <div className="color-origin-green-300">
                인증에 성공하셨습니다.{' '}
              </div>
            )}
            {verificationState.error && (
              <div className="color-origin-primary">
                인증에 실패했습니다. 다시 시도해주세요
              </div>
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
