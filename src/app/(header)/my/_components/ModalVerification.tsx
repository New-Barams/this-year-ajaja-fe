import { Button, Icon } from '@/components';
import classNames from 'classnames';
import { useState } from 'react';
import './index.scss';

//TODO 리렌더링 최적화 필요
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

  const handleSubmitEmail = () => {
    if (EmailRegExp.test(email)) {
      setEmailState({ error: false, success: false, isFetching: true });
      console.log('이메일 전송중');
      setTimeout(() => {
        setEmailState({ error: false, isFetching: false, success: true });
        //TODO input의 value는 변경될 가능성이 있다. 그래서 api를 통해서 변경된 이메일을 받아서 넣어준다 .
        setVerifiedEmail(email);
      }, 2000);
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
      setVerifiedEmail(email);
    });
    // 실패시 에러안내
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
